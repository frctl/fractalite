const { isAbsolute, relative } = require('path');
const { mapValues, isPlainObject } = require('lodash');
const { map } = require('asyncro');
const getPort = require('get-port');
const Koa = require('koa');
const compress = require('koa-compress');
const IO = require('koa-socket-2');
const send = require('koa-send');
const { EventEmitter2 } = require('eventemitter2');
const { permalinkify } = require('@frctl/fractalite-support/utils');
const Router = require('./router');
const Resources = require('./resources');
const Views = require('./views');
const createBuilder = require('./builder');
const getMode = require('./mode');

module.exports = function(compiler, opts = {}) {
  const middleware = [];
  const initialisers = [];
  const builders = [];
  const builderCopyTasks = [];
  const ui = { js: [], scripts: [], css: [], stylesheets: [] };
  const utils = {};

  const mode = getMode(opts);
  const router = new Router();
  const resources = new Resources();
  const views = new Views({ cache: mode.cache });
  const emitter = new EventEmitter2({ wildcard: true });
  const socket = new IO();

  const app = { router, resources, views, emitter, utils, compiler, socket };

  app.mode = mode.name;
  app.modeOpts = mode;

  app.addStaticDir = (name, path, mount) => {
    resources.add(name, path, mount);
    return app;
  };

  app.serveFile = (url, path) => {
    path = isAbsolute(path) ? relative(process.cwd(), path) : path;
    app.router.use(url, ctx => send(ctx, path, { root: process.cwd() }));
    builderCopyTasks.push({ from: path, to: url });
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
          to = app.url(to.name, to.params || {}, mode.paths);
        }
        copyTasks.push({ from, to });
      };
      const request = url => {
        if (isPlainObject(url)) {
          url = app.url(url.name, url.params || {});
        }
        requestTasks.push({ from: url, to: app.permalink(url, mode.paths) });
      };
      return builder(state, { copy, request });
    });
    return app;
  };

  app.url = (name, params, opts) => {
    const stringParams = mapValues(params, value => String(value));
    const url = decodeURIComponent(router.url(name, stringParams));
    return app.permalink(url, opts);
  };

  app.resourceUrl = (path, opts) => {
    const url = decodeURIComponent(resources.url(path));
    return app.permalink(url, opts);
  };

  app.permalink = (url, opts) => {
    if (opts === false) return url;
    return permalinkify(url, opts || mode.permalinks);
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

  app.run = async () => {
    const koa = new Koa();
    socket.attach(koa);

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

    koa.on('error', err => app.emit('error', err));

    app.emit('initialised', state);

    const port = await getPort({ port: mode.port });
    const server = await new Promise((resolve, reject) => {
      const httpServer = koa.listen(port, err => (err ? reject(err) : resolve(httpServer)));
    });

    app.emit('server.started', server);

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

      return server;
    }

    compiler.watch((err, ...results) => {
      if (err) return app.emit('error', err);
      app.emit('state.updated');
    });

    app.emit('watching');

    return server;
  };

  return app;
};
