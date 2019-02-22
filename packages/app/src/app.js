const { isAbsolute, relative } = require('path');
const { assign, get, set, mapValues, isPlainObject } = require('lodash');
const getPort = require('get-port');
const Koa = require('koa');
const compress = require('koa-compress');
const IO = require('koa-socket-2');
const send = require('koa-send');
const cleanStack = require('clean-stacktrace');
const { map } = require('asyncro');
const relativePaths = require('clean-stacktrace-relative-paths');
const { EventEmitter2 } = require('eventemitter2');
const { permalinkify, defaultsDeep, processStack } = require('@frctl/fractalite-support/utils');
const Router = require('./router');
const Resources = require('./resources');
const Views = require('./views');
const createBuilder = require('./builder');
const serveStatic = require('./serve');
const getMode = require('./mode');

module.exports = function(compiler, opts = {}) {
  const middleware = [];
  const initialisers = [];
  const builders = [];
  const builderCopyTasks = [];
  const ui = { js: [], scripts: [], css: [], stylesheets: [] };

  const mode = getMode(opts);
  const router = new Router();
  const resources = new Resources();
  const views = new Views({ cache: mode.cache });
  const emitter = new EventEmitter2({ wildcard: true });
  const utils = {};

  async function app() {
    const koa = new Koa();
    const socket = new IO();
    socket.attach(koa);
    app.socket = socket;

    koa.silent = true;
    koa.context.mode = mode;
    koa.context.utils = utils;

    const state = await compiler.run();

    middleware.forEach(mw => koa.use(mw));

    await map(initialisers, fn => fn(app, state));

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
    app.on('updated', (...results) => socket.broadcast('updated', ...results));

    app.emit('initialised', state);

    const port = await getPort({ port: mode.port });
    let server = await new Promise((resolve, reject) => {
      const httpServer = koa.listen(port, err => (err ? reject(err) : resolve(httpServer)));
    });

    app.emit('started', server);

    if (app.mode === 'build') {
      const builder = createBuilder();

      const staticFiles = await resources.list();

      staticFiles.forEach(({ path, url }) =>
        builder.addCopyTask({
          from: path,
          to: url
        })
      );

      builderCopyTasks.forEach(builder.addCopyTask);

      const copyTasks = [];
      const requestTasks = [];
      await map(builders, fn => fn(state, copyTasks, requestTasks));

      copyTasks.forEach(builder.addCopyTask);
      requestTasks.forEach(builder.addRequestTask);

      app.emit('build.start');

      const result = await builder.run(server, mode);

      app.emit('build.end', result);

      server.close();

      if (mode.serve === true) {
        server = await serveStatic(mode.dest, port);
        app.emit('build.serving', server);
      }

      return server;
    }

    compiler.watch((err, ...results) => {
      if (err) return app.emit('error', err);
      app.emit('updated', ...results);
    });

    app.emit('watching');

    return server;
  }

  Object.assign(app, { router, resources, views, emitter, utils, compiler });

  app.mode = mode.mode;

  app.addStaticDir = (name, path, mount) => {
    resources.add(name, path, mount);
    return app;
  };

  app.addRoute = (name, url, handler, builder) => {
    router.add({ name, url, handler });
    if (builder) {
      app.addBuilder(builder);
    }
    return app;
  };

  app.addBuilder = builder => {
    builders.push((state, copyTasks = [], requestTasks = []) => {
      const copy = (from, to) => {
        if (isPlainObject(to)) {
          to = app.url(to.name, to.params || {}, false);
        }
        copyTasks.push({ from, to });
      };
      const request = url => {
        if (isPlainObject(url)) {
          url = app.url(url.name, url.params || {}, false);
        }
        requestTasks.push({ from: url, to: app.permalink(url) });
      };
      return builder(state, { copy, request });
    });
    return app;
  };

  app.url = (name, params, permalink = true) => {
    const stringParams = mapValues(params, value => String(value));
    const url = decodeURIComponent(router.url(name, stringParams));
    return permalink ? permalinkify(url, mode) : url;
  };

  app.resourceUrl = path => {
    const url = decodeURIComponent(resources.url(path));
    return permalinkify(url, mode);
  };

  app.permalink = url => {
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

  app.serveFile = (url, path) => {
    path = isAbsolute(path) ? relative(process.cwd(), path) : path;
    app.router.use(url, ctx => send(ctx, path, { root: process.cwd() }));
    builderCopyTasks.push({ from: path, to: url });
  };

  // UI-related helpers -----------------------------------

  app.addJS = js => ui.push(js);
  app.addCSS = css => ui.css.push(css);

  app.addScript = (url, path) => {
    ui.scripts.push(url);
    if (path) app.serveFile(url, path);
  };

  app.addStylesheet = (url, path) => {
    ui.stylesheets.push(url);
    if (path) app.serveFile(url, path);
  };

  app.getCSS = () => ui.css.join('\n');
  app.getJS = () => ui.js.join('\n');
  app.getScripts = () => ui.scripts.map(app.resourceUrl);
  app.getStylesheets = () => ui.stylesheets.map(app.resourceUrl);

  return app;
};
