const { isString } = require('lodash');
const importCwd = require('import-cwd');
const { defaultsDeep, normalizePaths, toArray } = require('@fractalite/support/utils');
const noopTransform = require('./transform');
const defaults = require('../defaults');

module.exports = function(config) {
  const appConfig = defaultsDeep(config, defaults);

  if (isString(appConfig.src)) {
    appConfig.src = Object.assign({}, defaults.src, {
      paths: appConfig.src
    });
  }
  appConfig.src.paths = normalizePaths(appConfig.src.paths);

  if (Array.isArray(appConfig.watch) || isString(appConfig.watch)) {
    appConfig.watch = Object.assign({}, defaults.watch, {
      paths: appConfig.watch
    });
  }
  appConfig.watch.paths = normalizePaths([...appConfig.src.paths].concat(appConfig.watch.paths));

  appConfig.plugins = defaults.plugins.concat(config.plugins || []).map(pluginDef => {
    let [attacher, ...args] = toArray(pluginDef);
    attacher = isString(attacher) ? importCwd(attacher) : attacher;
    return [attacher].concat(...args);
  });

  appConfig.transform = appConfig.transform || noopTransform;

  return appConfig;
};
