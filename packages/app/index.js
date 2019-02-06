const fs = require('fs');
const { isFunction } = require('lodash');
const { File } = require('@fractalite/core');
const { resolveStack } = require('@fractalite/support/helpers');
const App = require('./src/app');

module.exports = function(opts = {}) {
  const app = new App(opts);
  const { router, views, utils } = app;

  /*
   * Nunjucks rendering middleware
   */
  app.use((ctx, next) => {
    ctx.response.render = async function(path, locals = {}, opts) {
      const state = { ...ctx.state, ...locals };
      ctx.type = ctx.type || 'text/html';
      ctx.body = await views.renderAsync(path, state, opts);
    };

    ctx.response.renderString = async function(str, locals = {}, opts) {
      const state = { ...ctx.state, ...locals };
      ctx.type = ctx.type || 'text/html';
      ctx.body = await views.renderStringAsync(str, state, opts);
    };

    ctx.loadView = path => views.getTemplateAsync(path);

    ctx.render = ctx.response.render;
    ctx.renderString = ctx.response.renderString;

    return next();
  });

  /*
   * File sending middleware
   */
  app.use((ctx, next) => {
    ctx.response.sendFile = function(file) {
      if (!File.isFile(file)) {
        throw new Error('Only Files can be sent');
      }
      ctx.lastModified = file.stats.mtime;
      ctx.length = file.stats.size;
      ctx.type = file.ext;
      ctx.type = ctx.response.type || 'text/plain';
      if (app.mode === 'develop') {
        ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
        ctx.set('Pragma', 'no-cache');
        ctx.set('Expires', 0);
      }
      ctx.body = fs.createReadStream(file.path);
    };

    ctx.sendFile = ctx.response.sendFile;
    return next();
  });

  /*
   * Middleware to add useful properties to state object
   * so that they will be available to templates.
   */
  app.use((ctx, next) => {
    ctx.components = ctx.api.components;
    ctx.assets = ctx.api.assets;
    ctx.state.api = ctx.api;
    ctx.state.mode = ctx.mode;
    ctx.state.error = ctx.error;
    ctx.state.request = {
      params: ctx.params,
      path: ctx.path,
      url: ctx.url,
      route: ctx.route
    };
    // All api methods are added as top-level helpers
    Object.keys(ctx.api).forEach(key => {
      ctx.state[key] = ctx.api[key];
    });
    return next();
  });

  /*
   * Add a route parameter loader for the :component param.
   */
  router.param('component', (handle, ctx, next) => {
    if (!handle) return next();
    try {
      ctx.component = ctx.api.getComponent(handle, true);
    } catch (err) {
      ctx.throw(404, err);
    }
    ctx.state.component = ctx.component;
    return next();
  });

  /*
   * Add a route parameter loader for the :variant param.
   */
  router.param('variant', (handle, ctx, next) => {
    if (!handle) return next();
    ctx.variant = ctx.api.getVariant(handle);
    if (!ctx.variant) {
      ctx.throw(404, `Variant '${handle}' not found`);
    }
    ctx.component = ctx.api.getComponent(ctx.variant);
    ctx.state.component = ctx.component;
    ctx.state.variant = ctx.variant;
    return next();
  });

  /*
   * Add a route parameter loader for the :asset param.
   */
  router.param('asset', (handle, ctx, next) => {
    if (!handle) return next();
    try {
      ctx.asset = ctx.api.getAsset(handle, true);
    } catch (err) {
      ctx.throw(404, err);
    }
    ctx.state.asset = ctx.asset;
    return next();
  });

  /*
   * Add a route parameter loader for the :src param.
   */
  router.param('file', (handle, ctx, next) => {
    if (!handle) return next();
    try {
      ctx.file = ctx.api.getFile(handle, true);
    } catch (err) {
      ctx.throw(404, err);
    }
    ctx.state.file = ctx.file;
    return next();
  });

  views.addGlobal('url', (name, params) => app.url(name, params));
  views.addGlobal('resourceUrl', (name, path) => app.resourceUrl(name, path));
  views.addFilter('resolveStack', resolveStack);

  app.addRoute('asset', '/assets/:asset(.+)', ctx => ctx.sendFile(ctx.asset));

  // app.addBuildStep('asset', ({ copyFile, api }) => {
  //   app.api.assets.forEach(asset => copyFile(asset.path, app.url('asset', { asset })));
  // });

  app.addRoute('src', '/src/:file(.+)', ctx => ctx.sendFile(ctx.file));

  // app.addBuildStep('src', ({ copyFile, api }) => {
  //   app.api.files.forEach(file => copyFile(file.path, app.url('src', { file })));
  // });

  return app;
};

module.exports.App = App;
