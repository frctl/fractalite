const EventEmitter = require('events');
const { isFunction, debounce } = require('lodash');
const { watch } = require('chokidar');
const { normalizeSrc } = require('@frctl/fractalite-support/utils');
const compose = require('./compose');
const createState = require('./state');
const readFiles = require('./read');
const compileComponents = require('./compile-components');

module.exports = function(config = {}) {
  const emitter = new EventEmitter();
  const middlewares = [];
  const compiler = {};
  const watchCallbacks = [];
  const parseSrc = normalizeSrc(config.src || {});
  const watchSrc = normalizeSrc(config.watch || {});

  const state = createState();

  Object.defineProperty(compiler, 'src', {
    get() {
      return { ...parseSrc, watch: { ...watchSrc } };
    },
    enumerable: true
  });

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
    emitter.emit('start');
    const ctx = {};
    const logs = [];
    const hrStart = process.hrtime();
    const { paths, opts } = parseSrc;

    let files = await readFiles(paths, {
      onlyFiles: false,
      gitignore: !!opts.gitignore
    });

    ctx.files = files;
    ctx.log = (message, level) => {
      logs.push({ level, message });
    };

    const components = await compileComponents(files, opts);
    files = files.filter(f => f.stats.isFile());
    const applyPlugins = compose(
      middlewares,
      ctx
    );
    await applyPlugins(components);
    state.update({ components, files });

    const info = {
      logs,
      time: process.hrtime(hrStart)
    };

    emitter.emit('finish', state, info);
    return { state, info };
  };

  compiler.watch = function(callback) {
    const watchers = [];
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
        const info = { path, event, ...lastResult.info };
        watchCallbacks.forEach(cb => cb(null, lastResult.state, info));
      } catch (err) {
        watchCallbacks.forEach(cb => cb(err));
      }
    }, 300);
  }

  return compiler;
};
