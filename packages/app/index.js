const fs = require('fs');
const jsonErrors = require('koa-json-error');
const cleanStack = require('clean-stacktrace');
const relativePaths = require('clean-stacktrace-relative-paths');
const { File, Asset } = require('@fractalite/core');
const { getComponent, getAsset, getFile, getVariant } = require('@fractalite/core/helpers');
const App = require('./src/app');

module.exports = function(compiler, opts = {}) {
  const app = new App(compiler, opts);
  const { router, views, utils } = app;

  app.use(jsonErrors());

  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api')) return next();
    try {
      await next();
      const status = ctx.status || 404;
      if (status === 404) {
        ctx.throw(404, 'Page not found');
      }
    } catch (err) {
      ctx.error = err;
      ctx.state.error = err;
      err.path = ctx.path;
      ctx.status = err.status || 500;
      ctx.app.emit('error', err, ctx);
      try {
        return ctx.render('error');
      } catch (renderError) {
        ctx.body = err;
      }
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      err.stack = cleanStack(err.stack, relativePaths());
      throw err;
    }
  });

  /*
   * View rendering middleware
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
    ctx.state.mode = ctx.mode;
    ctx.state.error = ctx.error;
    ctx.state.request = {
      params: ctx.params,
      path: ctx.path,
      url: ctx.url,
      route: ctx.route
    };
    const compilerState = app.compiler.getState();
    Object.keys(compilerState).forEach(key => {
      ctx[key] = compilerState[key];
      ctx.state[key] = ctx[key];
    });
    return next();
  });

  /*
   * Add a route parameter loader for the :component param.
   */
  router.param('component', (handle, ctx, next) => {
    if (!handle) return next();
    try {
      ctx.component = getComponent(ctx.state, handle, true);
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
    ctx.variant = getVariant(ctx.state, handle);
    if (!ctx.variant) {
      ctx.throw(404, `Variant '${handle}' not found`);
    }
    ctx.component = getComponent(ctx.state, ctx.variant);
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
      ctx.asset = getAsset(ctx.state, handle, true);
    } catch (err) {
      ctx.throw(404, err);
    }
    ctx.state.asset = ctx.asset;
    return next();
  });

  views.addGlobal('app', app.props());
  views.addGlobal('url', (name, params) => app.url(name, params));
  views.addGlobal('resourceUrl', (name, path) => app.resourceUrl(name, path));

  app.addRoute('asset', '/assets/:asset(.+)', ctx => ctx.sendFile(ctx.asset));

  // app.addBuildStep('asset', ({ copyFile, api }) => {
  //   app.api.assets.forEach(asset => copyFile(asset.path, app.url('asset', { asset })));
  // });

  app.addRoute('src', '/src/:file(.+)', ctx => {
    const file = ctx.files.filter(f => !Asset.isAsset(f)).find(f => f.handle === ctx.params.file);
    if (file) {
      ctx.sendFile(file);
    } else {
      ctx.throw(404, 'Source file not found');
    }
  });

  // app.addBuildStep('src', ({ copyFile, api }) => {
  //   app.api.files.forEach(file => copyFile(file.path, app.url('src', { file })));
  // });

  /*
   * Compiler middleware to add url properties to files and assets
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.files.forEach(file => {
        file.url = app.url('src', { file });
      });
    });
    assets.forEach(asset => {
      asset.url = app.url('asset', { asset });
    });
  });

  app.addRoute('app-css', `/app/assets/bundle.css`, ctx => {
    ctx.type = 'text/css';
    ctx.body = app.getCSS();
  });

  app.addRoute('app-js', `/app/assets/bundle.js`, ctx => {
    ctx.type = 'application/javascript';
    ctx.body = app.getJS();
  });

  app.use(async (ctx, next) => {
    ctx.state.scripts = app.getScripts();
    ctx.state.stylesheets = app.getStylesheets();
    if (app.getCSS() !== '') ctx.state.stylesheets.push(app.url('app-css'));
    if (app.getJS() !== '') ctx.state.scripts.push(app.url('app-js'));
    return next();
  });

  return app;
};

module.exports.App = App;
