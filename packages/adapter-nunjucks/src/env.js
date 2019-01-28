const { Environment } = require('nunjucks');
const ComponentExtension = require('./extension-component');
const FsLoader = require('./fs-loader');
const ViewLoader = require('./view-loader');

module.exports = function nunjucks(views = [], config = {}) {
  const loaders = [].concat(config.loaders || []);
  if (config.viewPaths) {
    loaders.push(new FsLoader(config.viewPaths));
  }

  const viewLoader = new ViewLoader();
  viewLoader.views = views;
  const env = new Environment([viewLoader, ...loaders]);

  env.addExtension('component', new ComponentExtension());

  Object.keys(config.globals || {}).forEach(key => env.addGlobal(key, config.globals[key]));
  Object.keys(config.extensions || {}).forEach(key =>
    env.addExtension(key, config.extensions[key])
  );
  if (Array.isArray(config.filters)) {
    config.filters.forEach(filter => env.addFilter(filter.name, filter.filter, filter.async));
  } else {
    Object.keys(config.filters || {}).forEach(key =>
      env.addFilter(key, config.filters[key], config.filters[key].async)
    );
  }

  return env;
};
