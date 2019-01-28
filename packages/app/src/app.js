const { omit, assign, cloneDeep, get, set, mapValues } = require('lodash');
const getPort = require('get-port');
const Koa = require('koa');
const compress = require('koa-compress');
const IO = require('koa-socket-2');
const Emitter = require('@fractalite/support/emitter');
const { Api } = require('@fractalite/core');
const { permalinkify, defaultsDeep } = require('@fractalite/support/utils');
const Router = require('./router');
const StaticRouter = require('./static-router');
const Views = require('./views');
const getMode = require('./mode');

module.exports = function(opts = {}) {
  let { compiler, adapter } = opts;
  const props = {};
  const middleware = [];

  const mode = getMode(opts.mode);
  const router = new Router();
  const static = new StaticRouter();
  const views = new Views({ cache: mode.cache });
  const emitter = new Emitter();

  async function app() {
    const state = {};
    const koa = new Koa();
    const socket = new IO();
    socket.attach(koa);

    koa.silent = true;
    koa.context.mode = mode;
    koa.context.api = new Api(state, adapter);

    middleware.forEach(mw => koa.use(mw));

    koa.use(compress());
    koa.use(static.routes());
    koa.use(router.errors());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    const server = await new Promise(async (resolve, reject) => {
      const port = await getPort({ port: mode.port });
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

  Object.assign(app, { router, static, views, emitter, adapter, compiler });

  app.mode = mode.mode;

  app.get = (key, fallback) => get(props, key, fallback);

  app.set = (key, value) => {
    set(props, key, value);
    return app;
  };

  app.push = (key, value) => {
    const current = app.get(key, []);
    if (!Array.isArray(current)) {
      throw new Error(`${key} is not an array`);
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
    static.add(name, path, mount);
    return app;
  };

  app.addRoute = (name, url, handler, builder) => {
    router.add({ name, url, handler });
    // web.addBuildStep(name, builder || (({ requestRoute }) => requestRoute(name)));
    return app;
  };

  app.addBuildStep = (...args) => {
    // web.addBuildStep(...args);
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

  app.staticUrl = (name, path) => {
    const url = decodeURIComponent(static.url(name, path));
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
