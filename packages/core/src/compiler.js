const { get, isFunction, isString, debounce, fromPairs } = require('lodash');
const { normalizeSrc } = require('@fractalite/support/utils');
const { watch } = require('chokidar');
const compose = require('./compose');
const createState = require('./state');

const entities = [
  {
    name: 'components',
    read: require('./read-components'),
    parseEvents: ['add', 'unlink', 'change', 'addDir', 'unlinkDir']
  },
  {
    name: 'assets',
    read: require('./read-assets'),
    parseEvents: ['add', 'change', 'unlink']
  }
];

module.exports = function(config = {}) {
  const middlewares = [];
  const compiler = {};
  const watchCallbacks = [];
  const state = createState();

  compiler.use = function(plugin) {
    middlewares.push(plugin);
    return compiler;
  };

  compiler.getState = () => {
    return state;
  };

  compiler.run = async function() {
    const applyPlugins = compose(middlewares);
    const results = entities.map(async ({ name, read }) => {
      const srcConfig = isString(config[name]) ? name : `${name}.src`;
      const { paths, opts } = src(srcConfig);
      return [name, await read(paths, opts)];
    });
    const result = await applyPlugins(fromPairs(await Promise.all(results)));
    return state.update(result);
  };

  compiler.watch = function(callback) {
    const watchers = [];
    for (const { name, parseEvents } of entities) {
      const parseSrc = src(isString(config[name]) ? name : `${name}.src`);
      const watchSrc = src(`${name}.watch`);

      const paths = [...parseSrc.paths, ...watchSrc.paths];
      const opts = Object.assign({ ignoreInitial: true }, watchSrc.opts);

      const watcher = watch(paths, opts)
        .on('all', watchHandler(name, parseEvents))
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

  function watchHandler(name, parseEvents) {
    let lastResult = null;
    return debounce(async (event, path) => {
      try {
        // Only re-parse for 'primary' events, otherwise just notify of changes
        lastResult = parseEvents.includes(event) ? await compiler.run() : lastResult;
        watchCallbacks.forEach(cb => cb(null, lastResult, { name, path, event }));
      } catch (err) {
        watchCallbacks.forEach(cb => cb(err));
      }
    }, 300);
  }

  return compiler;
};
