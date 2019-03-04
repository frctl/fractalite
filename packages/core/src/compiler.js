const EventEmitter = require('events');
const { isFunction, isString, debounce } = require('lodash');
const { normalizeSrc } = require('@frctl/fractalite-support/utils');
const { watch } = require('chokidar');
const compose = require('./compose');
const createState = require('./state');
const readComponents = require('./read-components');

module.exports = function(config = {}) {
  const emitter = new EventEmitter();
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

  compiler.on = (event, listener) => {
    emitter.on(event, listener);
    return compiler;
  };

  compiler.run = async function() {
    const hrStart = process.hrtime();
    emitter.emit('start');
    const applyPlugins = compose(middlewares);
    const { paths, opts } = normalizeSrc(config.src);
    const components = await readComponents(paths, opts);
    await applyPlugins(components);
    state.update({ components });
    emitter.emit('finish', state, process.hrtime(hrStart));
    return state;
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
      const hrStart = process.hrtime();
      try {
        // Only re-parse for 'primary' events, otherwise just notify of changes
        lastResult = parseEvents.includes(event) ? await compiler.run() : lastResult;
        const time = process.hrtime(hrStart);
        watchCallbacks.forEach(cb => cb(null, lastResult, { path, event, time }));
      } catch (err) {
        watchCallbacks.forEach(cb => cb(err));
      }
    }, 300);
  }

  return compiler;
};
