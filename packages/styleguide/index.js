const { resolve } = require('path');
const { forEach, get, mapValues } = require('lodash');
const jsonErrors = require('koa-json-error');
const App = require('@fractalite/app');
const { resolveValue, mapValuesAsync } = require('@fractalite/support/utils');
const corePlugins = require('./src/plugins');
const { map } = require('asyncro');
const cleanStack = require('clean-stacktrace');
const relativePaths = require('clean-stacktrace-relative-paths');

module.exports = function({ compiler, adapter, mode, ...config }) {
  const app = new App({ compiler, adapter, mode });

  app.props({
    title: config.title || 'Styleguide',
    stylesheets: ['styleguide:app.css'],
    scripts: ['styleguide:app.js'],
    css: [],
    js: [],
    inspector: {
      actions: [],
      panels: []
    }
  });

  app.addViewPath(resolve(__dirname, './views'));

  app.addStaticDir('styleguide', resolve(__dirname, './dist'), '/styleguide');

  app.addRoute('overview', '/', async (ctx, next) => ctx.render('app'));

  app.addRoute('api.component', '/api/components/:component.json', async (ctx, next) => {
    ctx.body = ctx.component;
    return next();
  });

  app.addRoute('api.inspect', '/api/inspect/:variant(.+).json', async (ctx, next) => {
    ctx.body = {
      title: `${ctx.component.label} / ${ctx.variant.label}`,
      variant: ctx.variant,
      preview: await app.renderPreview(ctx.variant, ctx.variant.previewProps),
      actions: await map(app.get('inspector.actions'), action => {
        return mapValuesAsync(action, value => resolveValue(value, ctx.state));
      }),
      panels: await map(app.get('inspector.panels'), panel => {
        return mapValuesAsync(panel, value => resolveValue(value, ctx.state));
      })
    };
    return next();
  });

  app.addRoute('inspect', '/inspect/:variant(.+)', (ctx, next) => ctx.render('app'));

  // app.addBuildStep('inspect', ({ requestRoute }) => {
  //   app.api.variants.forEach(variant => requestRoute('detail', { variant }));
  // });

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
        variant.url = app.url('inspect', { variant });
      });
    });
    assets.forEach(asset => {
      asset.url = app.url('asset', { asset });
    });
  });

  /*
   * Load all core plugins, initialised with opts
   */
  corePlugins.forEach(async ({ key, handler }) => {
    const opts = get(config, key, {});
    const plugin = handler(opts);
    await app.addPlugin(plugin);
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

  // TODO: improve handling of user defined css/js
  let css = app.get('css');
  let js = app.get('js');
  for (const panel of app.get('inspector.panels')) {
    if (panel.css) css.push(panel.css);
    if (panel.js) js.push(panel.js);
  }

  app.addViewGlobal('app', app.props());

  return app;
};
