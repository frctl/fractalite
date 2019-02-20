const { get, isFunction, isString, debounce, fromPairs } = require('lodash');
const { normalizeSrc } = require('@frctl/fractalite-support/utils');
const { watch } = require('chokidar');
const compose = require('./compose');
const createState = require('./state');
const readComponents = require('./read-components');

// const entities = [
//   {
//     name: 'components',
//     read: ,
//     parseEvents: ['add', 'unlink', 'change', 'addDir', 'unlinkDir']
//   },
//   {
//     name: 'assets',
//     read: require('./read-assets'),
//     parseEvents: ['add', 'change', 'unlink']
//   }
// ];

module.exports = function(config = {}) {
  const middlewares = [];
  const compiler = {};
  const watchCallbacks = [];
  if (isString(config)) {
    config = {
      src: config,
      watch: {}
    };
  }

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
    const { paths, opts } = normalizeSrc(config.src);
    const components = await readComponents(paths, opts);
    return state.update({
      components: await applyPlugins(components)
    });
  };

  compiler.watch = function(callback) {
    const watchers = [];
    const parseSrc = normalizeSrc(config.src);
    const watchSrc = normalizeSrc(config.watch || {});
    const paths = [...parseSrc.paths, ...watchSrc.paths];
    const opts = Object.assign({ ignoreInitial: true }, watchSrc.opts);

    const watcher = watch(paths, opts)
      .on('all', watchHandler(['add', 'unlink', 'change', 'addDir', 'unlinkDir']))
      .on('error', err => watchCallbacks.forEach(cb => cb(err)));

    watchers.push(watcher);

    compiler.watch = function(callback) {
      if (isFunction(callback)) {
        watchCallbacks.push(callback);
      }
    };

    compiler.watch(callback);
    return watchers;
  };

  function watchHandler(parseEvents) {
    let lastResult = null;
    return debounce(async (event, path) => {
      try {
        // Only re-parse for 'primary' events, otherwise just notify of changes
        lastResult = parseEvents.includes(event) ? await compiler.run() : lastResult;
        watchCallbacks.forEach(cb => cb(null, lastResult, { path, event }));
      } catch (err) {
        watchCallbacks.forEach(cb => cb(err));
      }
    }, 300);
  }

  return compiler;
};
