const { isString } = require('lodash');
const importCwd = require('import-cwd');
const { defaultsDeep, normalizePath, toArray } = require('@fractalite/support/utils');
const defaults = require('../defaults');

module.exports = function(config) {
  const appConfig = defaultsDeep(config, defaults);

  if (isString(appConfig.src)) {
    appConfig.src = Object.assign({}, defaults.src, {
      path: appConfig.src
    });
  }
  appConfig.src.path = normalizePath(appConfig.src.path);

  if (Array.isArray(appConfig.watch) || isString(appConfig.watch)) {
    appConfig.watch = Object.assign({}, defaults.watch, {
      paths: appConfig.watch
    });
  }
  appConfig.watch.paths = [appConfig.src.path].concat(appConfig.watch.paths).map(normalizePath);

  appConfig.engine = toArray(appConfig.engine);
  appConfig.engine[0] = isString(appConfig.engine[0])
    ? importCwd(appConfig.engine[0])
    : appConfig.engine[0];

  appConfig.plugins = defaults.plugins.concat(config.plugins || []).map(pluginDef => {
    let [attacher, ...args] = toArray(pluginDef);
    attacher = isString(attacher) ? importCwd(attacher) : attacher;
    return [attacher].concat(...args);
  });

  return appConfig;
};
