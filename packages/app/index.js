const fs = require('fs');
const jsonErrors = require('koa-json-error');
const prettier = require('prettier');
const cleanStack = require('clean-stacktrace');
const relativePaths = require('clean-stacktrace-relative-paths');
const { getComponent, isFile } = require('@frctl/fractalite-core/helpers');
const serveStatic = require('./src/serve');
const App = require('./src/app');

module.exports = function(compiler, opts = {}) {
  const app = new App(compiler, opts);
  const { router, views, socket } = app;

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

  app.on('error', err =>
    socket.broadcast('err', {
      name: err.name,
      message: err.message,
      stack: cleanStack(err.stack, relativePaths()),
      status: err.status
    })
  );

  app.on('state.updated', (...results) => socket.broadcast('state.updated'));

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
    ctx.response.sendFile = async function(file) {
      if (!isFile(file)) {
        throw new Error('Only Files can be sent');
      }
      const contents = await file.getContents();
      ctx.lastModified = file.stats.mtime;
      ctx.length = contents.length;
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
  router.param('component', (name, ctx, next) => {
    if (!name) return next();
    try {
      ctx.component = getComponent(ctx.state, name, true);
    } catch (err) {
      ctx.throw(404, err);
    }
    ctx.state.component = ctx.component;
    return next();
  });

  views.addGlobal('url', (name, params) => app.url(name, params));
  views.addGlobal('resourceUrl', (name, path) => app.resourceUrl(name, path));

  app.addRoute('file', '/src/:file(.+)', ctx => {
    const file = ctx.files.find(f => f.relative === ctx.params.file);
    if (file) {
      return ctx.sendFile(file);
    }
    ctx.throw(404, 'File not found');
  });

  app.addBuilder((state, { copy }) => {
    state.files.forEach(file =>
      copy(file.path, {
        name: 'file',
        params: { file }
      })
    );
  });

  /*
   * Compiler middleware to add url properties to files
   */
  app.compiler.use(async (components, next, { files }) => {
    await next();
    files.forEach(file => {
      file.url = app.url('file', { file });
    });
  });

  app.addRoute('app-css', `/app/assets/bundle.css`, ctx => {
    ctx.type = 'text/css';
    ctx.body = prettier.format(app.getCSS(), { parser: 'css' });
  });

  app.addRoute('app-js', `/app/assets/bundle.js`, ctx => {
    ctx.type = 'application/javascript';
    ctx.body = prettier.format(app.getJS(), { parser: 'babel' });
  });

  app.addBuilder((state, { request }) => request({ name: 'app-css' }));
  app.addBuilder((state, { request }) => request({ name: 'app-js' }));

  app.use((ctx, next) => {
    ctx.state.scripts = app.getScripts();
    ctx.state.stylesheets = app.getStylesheets();
    if (app.getCSS() !== '') ctx.state.stylesheets.push(app.url('app-css'));
    if (app.getJS() !== '') ctx.state.scripts.push(app.url('app-js'));
    return next();
  });

  return app;
};

module.exports.App = App;
module.exports.serveStatic = serveStatic;
