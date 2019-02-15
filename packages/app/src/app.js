const { assign, get, set, mapValues } = require('lodash');
const getPort = require('get-port');
const Koa = require('koa');
const compress = require('koa-compress');
const IO = require('koa-socket-2');
const cleanStack = require('clean-stacktrace');
const { map } = require('asyncro');
const relativePaths = require('clean-stacktrace-relative-paths');
const Emitter = require('@fractalite/support/emitter');
const { permalinkify, defaultsDeep, processStack } = require('@fractalite/support/utils');
const Router = require('./router');
const Resources = require('./resources');
const Views = require('./views');
const getMode = require('./mode');

module.exports = function(compiler, opts = {}) {
  const props = {};
  const middleware = [];
  const initialisers = [];
  const ui = { js: [], scripts: [], css: [], stylesheets: [] };

  const mode = getMode(opts);
  const router = new Router();
  const resources = new Resources();
  const views = new Views({ cache: mode.cache });
  const emitter = new Emitter();
  const utils = {};

  async function app() {
    const koa = new Koa();
    const socket = new IO();
    socket.attach(koa);

    const state = await compiler.run();

    koa.silent = true;
    koa.context.mode = mode;
    koa.context.utils = utils;

    middleware.forEach(mw => koa.use(mw));

    koa.use(compress());
    koa.use(resources.routes());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    app.on('error', err =>
      socket.broadcast('err', {
        name: err.name,
        message: err.message,
        stack: cleanStack(err.stack, relativePaths()),
        status: err.status
      })
    );
    koa.on('error', err => app.emit('error', err));
    app.on('updated', () => socket.broadcast('updated', state));

    await map(initialisers, fn => fn(app, state));

    app.emit('initialised');

    const port = await getPort({ port: mode.port });
    const server = await new Promise((resolve, reject) => {
      const httpServer = koa.listen(port, err => (err ? reject(err) : resolve(httpServer)));
    });

    app.emit('started', server);

    if (app.mode === 'build') {
      // TODO
      server.close();
      return;
    }

    compiler.watch((err, state) => {
      if (err) return app.emit('error', err);
      app.emit('updated', state);
    });

    app.emit('watching');

    return server;
  }

  Object.assign(app, { router, resources, views, emitter, compiler, utils });

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
    return props;
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

  app.extend = obj => {
    for (const key of Object.keys(obj)) {
      if (typeof app[key] !== 'undefined') {
        throw new TypeError(`Cannot redefine ${key} property on app instance`);
      }
    }
    Object.assign(app, obj);
  };

  app.beforeStart = fn => {
    initialisers.push(fn);
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

  // UI-related helpers -----------------------------------

  app.addJS = js => ui.push(js);
  app.addCSS = css => ui.css.push(css);
  app.addScript = src => ui.scripts.push(src);
  app.addStylesheet = href => ui.stylesheets.push(href);

  app.getCSS = () => ui.css.join('\n');
  app.getJS = () => ui.js.join('\n');
  app.getScripts = () => processStack(ui.scripts, app.resourceUrl);
  app.getStylesheets = () => processStack(ui.stylesheets, app.resourceUrl);

  return app;
};
