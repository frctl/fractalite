const { get, isFunction, isString, debounce, fromPairs } = require('lodash');
const { normalizeSrc } = require('@fractalite/support/helpers');
const { watch } = require('chokidar');
const compose = require('./compose');

const entities = [
  {
    name: 'components',
    read: require('./read-components'),
    parseEvents: ['add', 'unlink', 'change', 'addDir', 'unlinkDir']
  },
  {
    name: 'assets',
    read: require('./read-assets'),
    parseEvents: ['add', 'unlink']
  }
];

module.exports = function(config = {}) {
  const middlewares = [];
  const compiler = {};
  const watchCallbacks = [];

  compiler.use = function(plugin) {
    middlewares.push(plugin);
    return compiler;
  };

  compiler.parse = async function() {
    const applyPlugins = compose(middlewares);
    const results = entities.map(async ({ name, read }) => {
      const srcConfig = isString(config[name]) ? name : `${name}.src`;
      const { paths, opts } = src(srcConfig);
      return [name, await read(paths, opts)];
    });
    return applyPlugins(fromPairs(await Promise.all(results)));
  };

  compiler.watch = function(callback) {
    const watchers = [];
    for (const { name, parseEvents } of entities) {
      const parseSrc = src(isString(config[name]) ? name : `${name}.src`);
      const watchSrc = src(`${name}.watch`);

      const paths = [...parseSrc.paths, ...watchSrc.paths];
      const opts = Object.assign({ ignoreInitial: true }, watchSrc.opts);

      const watcher = watch(paths, opts)
        .on('all', watchHandler(parseEvents))
        .on('error', err => watchCallbacks.forEach(cb => cb(err)));
      watchers.push(watcher);
    }

    compiler.watch = function(callback) {
      if (isFunction(callback)) {
        watchCallbacks.push(callback);
      }
    };

    compiler.watch(callback);
    return watchers;
  };

  function src(configPath) {
    const src = get(config, configPath, {});
    return normalizeSrc(src);
  }

  function watchHandler(parseEvents) {
    let lastResult = null;
    return debounce(async (evt, path) => {
      // if (['addDir', 'unlinkDir'].includes(evt)) return; // ignore these events
      try {
        // Only re-parse for 'primary' events, otherwise just notify of changes
        lastResult = parseEvents.includes(evt) ? await compiler.parse() : lastResult;
        watchCallbacks.forEach(cb => cb(null, lastResult));
      } catch (err) {
        watchCallbacks.forEach(cb => cb(err));
      }
    }, 300);
  }

  return compiler;
};
