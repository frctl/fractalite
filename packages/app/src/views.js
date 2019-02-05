const { normalize } = require('path');
const { Environment } = require('nunjucks');
const { SafeString } = require('nunjucks').runtime;
const { each, merge, isPlainObject } = require('lodash');
const ViewLoader = require('./views-loader');
const IncludeRawExtension = require('./include-raw');

const defaults = {
  paths: [],
  filters: {},
  globals: {},
  extensions: {},
  opts: {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    noCache: true
  }
};

module.exports = function(config = {}) {
  config = merge({}, defaults, config);

  const loader = new ViewLoader(config.paths, {
    noCache: !config.cache
  });

  const njk = new Environment(loader, config.opts);

  const oldAddFilter = njk.addFilter;
  njk.addFilter = function(name, filter) {
    const wrapped = function(...args) {
      const done = args.pop();
      Promise.resolve(filter.bind(this)(...args))
        .then(result => done(null, result))
        .catch(err => done(err));
    };
    oldAddFilter.call(njk, name, wrapped, true);
    return njk;
  };

  each(config.filters, (filter, name) => njk.addFilter(name, filter));
  each(config.globals, (val, name) => njk.addGlobal(name, val));
  each(config.extensions, (ext, name) => njk.addExtension(name, ext));

  njk.loader = loader;

  njk.addPath = function(path) {
    if (loader.searchPaths.length === 1 && loader.searchPaths[0] === '.') {
      loader.searchPaths[0] = normalize(path);
    } else {
      loader.searchPaths.unshift(path);
    }
  };

  njk.useCache = function(useCache) {
    loader.noCache = !useCache;
  };

  njk.mergeGlobal = function(name, val) {
    let current;
    try {
      current = njk.getGlobal(name);
    } catch (err) {
      // ignore
    }
    if (isPlainObject(current)) {
      return njk.addGlobal(name, merge({}, current, val));
    }
    return njk.addGlobal(name, val);
  };

  ['render', 'renderString', 'getTemplate'].forEach(method => {
    njk[`${method}Async`] = function(...args) {
      args = args.filter(arg => arg !== undefined);
      return new Promise((resolve, reject) => {
        njk[method](...args, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    };
  });

  njk.addFilter('await', async (promise, catchError) => {
    try {
      return await promise;
    } catch (err) {
      if (catchError) {
        return err;
      }
    }
  });

  njk.SafeString = SafeString;

  njk.addExtension('includeraw', new IncludeRawExtension());

  return njk;
};
