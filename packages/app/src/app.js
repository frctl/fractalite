const { assign, cloneDeep, get, set, mapValues } = require('lodash');
const getPort = require('get-port');
const Koa = require('koa');
const compress = require('koa-compress');
const IO = require('koa-socket-2');
const Emitter = require('@fractalite/support/emitter');
const { Api } = require('@fractalite/core');
const { permalinkify, defaultsDeep } = require('@fractalite/support/utils');
const Router = require('./router');
const Resources = require('./resources');
const Views = require('./views');
const getMode = require('./mode');

module.exports = function(opts = {}) {
  const { compiler, adapter } = opts;
  const props = {};
  const middleware = [];
  const state = {};

  const mode = getMode(opts.mode);
  const router = new Router();
  const resources = new Resources();
  const views = new Views({ cache: mode.cache });
  const emitter = new Emitter();
  const api = new Api(state, adapter);

  async function app() {
    const koa = new Koa();
    const socket = new IO();
    socket.attach(koa);

    koa.silent = true;
    koa.context.mode = mode;
    koa.context.api = app.api;

    middleware.forEach(mw => koa.use(mw));

    koa.use(compress());
    koa.use(resources.routes());
    koa.use(router.errors());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    const port = await getPort({ port: mode.port });
    const server = await new Promise((resolve, reject) => {
      const httpServer = koa.listen(port, err => (err ? reject(err) : resolve(httpServer)));
    });

    assign(state, await compiler.parse());

    koa.on('error', err => app.emit('error', err));
    app.on('updated', () => socket.broadcast('updated', state));

    if (app.mode === 'build') {
      // TODO
      server.close();
    }

    compiler.watch((err, result) => {
      if (err) return app.emit('error', err);
      assign(state, result);
      app.emit('updated', state);
    });

    return server;
  }

  Object.assign(app, { router, resources, views, emitter, adapter, compiler, api });

  app.mode = mode.mode;

  app.get = (key, fallback) => get(props, key, fallback);

  app.set = (key, value) => {
    set(props, key, value);
    return app;
  };

  app.push = (key, value) => {
    const current = app.get(key, []);
    if (!Array.isArray(current)) {
      throw new TypeError(`${key} is not an array`);
    }
    current.push(value);
    return app.set(key, current);
  };

  app.props = obj => {
    if (obj) {
      assign(props, defaultsDeep(obj, props));
      return app;
    }
    return cloneDeep(props);
  };

  app.addPlugin = plugin => {
    plugin(app);
    return app;
  };

  app.addStaticDir = (name, path, mount) => {
    resources.add(name, path, mount);
    return app;
  };

  app.addRoute = (name, url, handler, builder) => {
    router.add({ name, url, handler });
    // Web.addBuildStep(name, builder || (({ requestRoute }) => requestRoute(name)));
    return app;
  };

  app.addBuildStep = (...args) => {
    // Web.addBuildStep(...args);
    return app;
  };

  app.addErrorHandler = (name, handler) => {
    if (typeof name === 'function') {
      handler = name;
      name = 'error';
    }
    router.add({ name, handler });
    return app;
  };

  app.url = (name, params) => {
    const stringParams = mapValues(params, value => String(value));
    return permalinkify(decodeURIComponent(router.url(name, stringParams)), mode);
  };

  app.resourceUrl = (name, path) => {
    const url = decodeURIComponent(resources.url(name, path));
    return permalinkify(url, mode);
  };

  app.on = (...args) => {
    emitter.on(...args);
    return app;
  };

  app.emit = (...args) => {
    emitter.emit(...args);
    return app;
  };

  app.use = mw => {
    middleware.push(mw);
    return app;
  };

  ['Filter', 'Extension', 'Path'].forEach(type => {
    app[`addView${type}`] = (...args) => {
      views[`add${type}`](...args);
      return app;
    };
  });

  app.addViewGlobal = (name, val, merge = false) => {
    views[merge ? 'mergeGlobal' : 'addGlobal'](name, val);
    return app;
  };

  app.getViewTemplate = path => {
    views.getTemplateAsync(path);
    return app;
  };

  return app;
};
