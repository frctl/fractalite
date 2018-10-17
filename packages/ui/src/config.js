const { get, compact, cloneDeep, isString, isPlainObject } = require('lodash');
const { defaultsDeep } = require('@fractalite/support/utils');
const { mergeSrcRefs } = require('@fractalite/support/helpers');
const importCwd = require('import-cwd');
const defaults = require('../defaults');

module.exports = function(opts = {}) {
  let [theme, themeOpts] = [].concat(opts.theme);
  theme = isString(theme) ? importCwd(theme) : theme;
  const themeConfig = isPlainObject(theme) ? theme : theme(themeOpts);
  const config = cloneDeep([defaults(), themeConfig, opts]);

  return {
    engine: {
      cache: resolve(config, 'cache'),
      globals: blend(config, 'globals'),
      filters: assign(config, 'filters'),
      helpers: assign(config, 'helpers'),
      extensions: assign(config, 'extensions'),
      views: concat(config, 'views').reverse()
    },
    parser: {
      plugins: concat(config, 'parser.plugins')
    },
    routes: concat(config, 'routes'),
    assets: concatAssets(config),
    develop: assign(config, 'develop'),
    pages: assign(config, 'pages'),
    build: assign(config, 'build'),
    preview: mergePreviews(config),
    stylesheets: mergeRefs(config, 'stylesheets'),
    scripts: mergeRefs(config, 'scripts'),
    opts: blend(config, 'opts'),
    get(path, fallback) {
      return get(this, path, fallback);
    }
  };
};

function concatAssets(configs) {
  const path = 'assets';
  let opts = getValues(configs, path).map(opt => {
    return isString(opt) ? { src: opt } : opt;
  });
  opts = [].concat(opts.reverse());
  return compact([].concat(...opts));
}

function mergePreviews(configs) {
  const path = 'preview';
  const values = getValues(configs, path, []);
  const stylesheets = values.map(c => c.stylesheets).reverse();
  const scripts = values.map(c => c.scripts).reverse();
  return Object.assign({}, ...values, { stylesheets, scripts });
}

function mergeRefs(configs, path) {
  const values = getValues(configs, path, []);
  return mergeSrcRefs(values);
}

function getValues(configs, path, fallback) {
  return configs.map(c => get(c, path, fallback));
}

function resolve(configs, path) {
  const values = getValues(configs, path);
  return values.filter(v => v !== undefined).reverse()[0];
}

function assign(configs, path) {
  return Object.assign({}, ...getValues(configs, path, {}));
}

function blend(configs, path) {
  return defaultsDeep(...getValues(configs, path, {}).reverse());
}

function concat(configs, path) {
  return compact([].concat(...getValues(configs, path)));
}
