const { resolve } = require('path');
const { forEach, get, isFunction } = require('lodash');
const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const createApp = require('@frctl/fractalite-app');
const createCompiler = require('@frctl/fractalite-core');
const { htmlAdapter } = require('@frctl/fractalite-core');
const highlight = require('./src/server/utils/highlight');
const markdown = require('./src/server/utils/markdown');
const plugins = require('./src/server/plugins');

module.exports = function({ components, assets, adapter, mode, ...config }) {
  const compiler = createCompiler({ components, assets });
  const app = createApp(compiler, mode);

  app.props({
    config,
    title: config.title || 'Styleguide',
    meta: defaultsDeep(config.meta || {}, {
      title: config.title || 'Styleguide',
      lang: 'en',
      dir: 'ltr',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0'
    })
  });

  app.addViewPath(resolve(__dirname, './views'));

  app.addStaticDir('app', resolve(__dirname, './dist'), '/app/assets');
  app.addStylesheet('app:app.css');
  app.addScript('app:app.js');

  app.addRoute('overview', '/', (ctx, next) => ctx.render('app'));

  app.addRoute('api.component', '/api/components/:component.json', (ctx, next) => {
    ctx.body = ctx.component;
    return next();
  });

  app.utils.highlightCode = highlight(get(config, 'opts.highlight'));

  app.utils.renderMarkdown = markdown({
    highlight: app.utils.highlightCode,
    ...get(config, 'opts.markdown')
  });

  adapter = adapter || htmlAdapter;
  adapter = isFunction(adapter) ? adapter(app, config) : adapter;

  ['references', 'preview', 'pages', 'nav', 'inspector'].forEach(name => {
    require(`./src/server/${name}`)(app, adapter, get(config, name));
  });

  /*
   * Load all core plugins, initialised with opts
   */
  plugins.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    const plugin = handler(opts);
    plugin(app, adapter);
  });

  /*
   * Load all user-defined plugins
   */
  forEach(config.plugins, plugin => plugin(app, adapter));

  /*
   * Run the init method for any final
   * fine-grained tweaking.
   */
  if (typeof config.init === 'function') {
    config.init(app, adapter);
  }

  return app;
};
