const { resolve } = require('path');
const { forEach, get, isFunction } = require('lodash');
const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const createApp = require('@frctl/fractalite-app');
const { createCompiler, createRenderer } = require('@frctl/fractalite-core');
const { htmlAdapter } = require('@frctl/fractalite-core');
const highlight = require('./src/server/utils/highlight');
const markdown = require('./src/server/utils/markdown');
const prettify = require('./src/server/utils/prettify');
const plugins = require('./src/server/plugins');

const configDefaults = {
  plugins: []
};

module.exports = function({ components, adapter, mode, ...config }) {
  config = defaultsDeep(config, configDefaults);

  const compiler = createCompiler(components);
  const app = createApp(compiler, mode);

  adapter = adapter || htmlAdapter;
  adapter = isFunction(adapter) ? adapter(app, compiler) : adapter;

  const renderer = createRenderer(compiler.getState(), adapter);

  app.addViewPath(resolve(__dirname, './views'));

  app.addStaticDir('app', resolve(__dirname, './dist'), '/app/assets');
  app.addStylesheet('app:app.css');
  app.addScript('app:app.js');

  app.addRoute('overview', '/', (ctx, next) => ctx.render('app'));

  app.addRoute('api.component', '/api/components/:component.json', (ctx, next) => {
    ctx.body = ctx.component;
    return next();
  });

  /*
   * Add utilities
   */
  app.utils.highlightCode = highlight(get(config, 'opts.highlight'));
  app.utils.renderMarkdown = markdown({
    highlight: app.utils.highlightCode,
    ...get(config, 'opts.markdown')
  });
  app.utils.prettify = prettify(get(config, 'opts.prettify'));

  ['references', 'public', 'preview', 'pages', 'nav', 'inspector'].forEach(name => {
    require(`./src/server/${name}`)(app, compiler, renderer, get(config, name));
  });

  /*
   * Load all core plugins, initialised with opts
   */
  plugins.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    const plugin = handler(opts);
    plugin(app, compiler, renderer);
  });

  /*
   * Load all user-defined plugins
   */
  forEach(config.plugins, plugin => plugin(app, compiler, renderer));

  /*
   * Add global props
   */
  app.addViewGlobal('app', {
    title: config.title || 'Fractalite',
    meta: defaultsDeep(config.meta || {}, {
      title: config.title || 'Fractalite',
      lang: 'en',
      dir: 'ltr',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0'
    })
  });

  return app;
};
