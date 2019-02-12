const { Environment } = require('nunjucks');
const ComponentExtension = require('./extension-component');
const Loader = require('./loader');

module.exports = function nunjucks(config = {}) {
  const loader = new Loader();
  const env = new Environment([loader]);

  env.addExtension('component', new ComponentExtension());

  Object.keys(config.globals || {}).forEach(key => env.addGlobal(key, config.globals[key]));
  Object.keys(config.extensions || {}).forEach(key => env.addExtension(key, config.extensions[key]));
  if (Array.isArray(config.filters)) {
    config.filters.forEach(filter => env.addFilter(filter.name, filter.filter, filter.async));
  } else {
    Object.keys(config.filters || {}).forEach(key => env.addFilter(key, config.filters[key], config.filters[key].async));
  }

  env.loader = loader;

  return env;
};
