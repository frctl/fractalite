const { Environment } = require('nunjucks');
const RenderExtension = require('./extensions/render');
const FsLoader = require('./fs-loader');
const ViewLoader = require('./view-loader');

module.exports = function nunjucks(config = {}) {
  const loaders = [].concat(config.loaders || []);
  if (config.views) {
    loaders.push(new FsLoader(config.views));
  }

  const viewLoader = new ViewLoader();
  const env = new Environment([viewLoader, ...loaders]);

  env.addExtension('render', new RenderExtension());

  registerAddons(env, config);

  return function render(str, data, ctx) {
    viewLoader.views = ctx.state.views;
    env.state = ctx.state;

    return new Promise((resolve, reject) => {
      env.renderString(str, data, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
};

function registerAddons(env, config) {
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
}
