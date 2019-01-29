const { resolve } = require('path');
const { forEach, isArray, get } = require('lodash');
const { map } = require('asyncro');
const App = require('@fractalite/app');
const { File, Asset } = require('@fractalite/core');
const corePlugins = require('./src/plugins');

module.exports = function({ compiler, adapter, mode, ...config }) {
  const app = App({ compiler, adapter, mode });

  app.props({
    title: config.title || 'Styleguide',
    stylesheets: ['styleguide:app.css'],
    scripts: ['styleguide:app.js', 'styleguide:reload.js'],
    inspector: {
      panels: []
    }
  });

  app.addViewPath(resolve(__dirname, './views'));

  app.addStaticDir('styleguide', resolve(__dirname, './dist'), '/styleguide');

  app.addRoute('overview', '/', async (ctx, next) => {
    await next();
    if (!ctx.page) {
      return ctx.render('overview');
    }
  });

  app.addRoute('inspect', '/inspect/:variant(.+)', async (ctx, next) => {
    return ctx.render('inspector');
  });

  app.addBuildStep('inspect', ({ requestRoute }) => {
    app.api.variants.forEach(variant => requestRoute('detail', { variant }));
  });

  app.addRoute('asset', '/assets/:asset(.+)', async ctx => ctx.sendFile(ctx.asset));

  app.addBuildStep('asset', ({ copyFile, api }) => {
    app.api.assets.forEach(asset => copyFile(asset.path, app.url('asset', { asset })));
  });

  app.addRoute('src', '/src/:file(.+)', async ctx => ctx.sendFile(ctx.file));

  app.addBuildStep('src', ({ copyFile, api }) => {
    app.api.files.forEach(file => copyFile(file.path, app.url('src', { file })));
  });

  app.addErrorHandler('404', ctx => ctx.render('404'));
  app.addErrorHandler(ctx => ctx.render('error'));

  /*
   * Compiler middleware to add url properties to entities
   */
  app.compiler.use(async function({ components, assets }, next) {
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
    try {
      const opts = get(config, key, {});
      const plugin = handler(opts);
      await app.addPlugin(plugin);
    } catch (err) {
      console.log(err);
    }
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

  app.set(
    'inspector.panels',
    app.get('inspector.panels').map(panel => Object.assign({ display: () => true }, panel))
  );
  app.addViewGlobal('app', app.props());

  return app;
};
