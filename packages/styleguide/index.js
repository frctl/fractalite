const { resolve } = require('path');
const { forEach, get, mapValues, orderBy } = require('lodash');
const jsonErrors = require('koa-json-error');
const App = require('@fractalite/app');
const corePlugins = require('./src/server/plugins');
const cleanStack = require('clean-stacktrace');
const relativePaths = require('clean-stacktrace-relative-paths');

const staticAssetsMount = '/styleguide';

module.exports = function({ components, assets, adapter, mode, ...config }) {
  const app = new App({ components, assets, adapter, mode });

  app.props({
    title: config.title || 'Styleguide',
    stylesheets: ['styleguide:app.css', 'styleguide:plugins.css'],
    scripts: ['styleguide:app.js', 'styleguide:plugins.js'],
    css: [],
    js: [],
    config
  });

  app.addViewPath(resolve(__dirname, './views'));

  app.addStaticDir('styleguide', resolve(__dirname, './dist'), staticAssetsMount);

  app.addRoute('overview', '/', async (ctx, next) => ctx.render('app'));

  app.addRoute('api.component', '/api/components/:component.json', async (ctx, next) => {
    ctx.body = ctx.component;
    return next();
  });

  app.addRoute('styleguide-css', `${staticAssetsMount}/plugins.css`, ctx => {
    ctx.type = 'text/css';
    ctx.body = app.get('css').join('\n');
  });

  app.addRoute('styleguide-js', `${staticAssetsMount}/plugins.js`, ctx => {
    ctx.type = 'application/javascript';
    ctx.body = app.get('js').join('\n');
  });

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
      return ctx.render('error');
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
   * Compiler middleware to add url properties to entities
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.files.forEach(file => {
        file.url = app.url('src', { file });
      });
      component.variants.forEach(variant => {
        variant.url = app.url('inspect', { handle: variant });
      });
    });
    assets.forEach(asset => {
      asset.url = app.url('asset', { asset });
    });
  });

  /*
   * Styleguide-specific API methods
   */
  const styleguide = {};

  styleguide.addJS = js => app.get('js').push(js);
  styleguide.addCSS = css => app.get('css').push(css);
  styleguide.addScript = src => app.get('scripts').push(src);
  styleguide.addStylesheet = href => app.get('stylesheets').push(href);

  app.styleguide = styleguide;

  /*
   * Load all core plugins, initialised with opts
   */
  corePlugins.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    const plugin = handler(opts);
    app.addPlugin(plugin);
  });

  /*
   * Load all user-defined plugins
   */
  forEach(config.plugins, app.addPlugin);

  /*
   * Run the init method for any final
   * fine-grained tweaking.
   */
  if (typeof config.init === 'function') {
    config.init(app);
  }

  app.addViewGlobal('app', app.props());

  return app;
};
