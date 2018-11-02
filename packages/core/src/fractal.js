const { get, isString, isFunction, cloneDeep } = require('lodash');
const watch = require('glob-watcher');
const { EventEmitter2 } = require('eventemitter2');
const { defaultsDeep } = require('@fractalite/support/utils');
const resolveConfig = require('./config');
const LogEmitter = require('./log-emitter');
const Parser = require('./parser');
const State = require('./state');

class Fractal {
  constructor(config = {}, state) {
    this._initialised = false;
    this._config = resolveConfig(config);

    state = state || new State();
    state.addStore('components', []);
    state.addStore('files', []);
    state.addGetter('views', stores => {
      return stores.components
        .map(c => {
          return c.view ? Object.assign({ name: c.name }, c.view) : null;
        })
        .filter(view => view);
    });

    this._state = state;
    this._parser = new Parser(this.get('src.path'), this.get('src.opts'));
    this._emitter = new EventEmitter2({ wildcard: true });
    this._watcher = null;
    this._watchCallbacks = [];

    const [engine, engineOpts = {}] = this.get('engine');
    this._renderFn = engine(engineOpts, this);

    for (const pluginDef of this.get('plugins')) {
      this.use(...pluginDef);
    }
  }

  get parser() {
    return this._parser;
  }

  get state() {
    return this._state;
  }

  get watcher() {
    return this._watcher;
  }

  get emitter() {
    return this._emitter;
  }

  on(...args) {
    this._emitter.on(...args);
    return this;
  }

  emit(...args) {
    this._emitter.emit(...args);
    return this;
  }

  get(path, fallback) {
    return cloneDeep(get(this._config, path, fallback));
  }

  getState() {
    return this.state;
  }

  use(attacher, opts = {}, ...ctx) {
    const options = defaultsDeep(this.get(`opts.${attacher.name}`, {}), opts);
    const plugin = attacher(options, ...ctx);
    const logger = new LogEmitter(this._emitter);
    this._parser.use(attacher.name, plugin.bind(logger));
    return this;
  }

  async init() {
    if (!this._initialised) {
      await this.updateState();
      this._initialised = true;
    }
    return this.getState();
  }

  async updateState() {
    this._state.update(await this.parser.run());
    return this.getState();
  }

  watch(callback) {
    if (isFunction(callback)) {
      this._watchCallbacks.push(callback);
    }
    if (this._watcher) {
      return this._watcher;
    }
    this._watcher = watch(this.get('watch.paths'), this.get('watch.opts'), async () => {
      try {
        const state = await this.updateState();
        await Promise.all(this._watchCallbacks.map(cb => cb(state)));
      } catch (err) {
        this.emit('error', err);
      }
    });
    return this;
  }

  render(target, context, opts = {}) {
    const state = this.getState();
    const render = this._renderFn;

    if (isString(target)) {
      return render(target, context, { state });
    }

    let component;
    let variant;
    if (target._component) {
      variant = target;
      component = state.components.find(c => c.name === target._component);
      if (!component) {
        throw new Error('Component not found');
      }
      context = opts.merge === false ? context : defaultsDeep(context, variant.props);
    } else {
      component = target;
    }

    const { view } = component;
    if (!view) {
      throw new Error('Cannot render components that do not have a view');
    }

    return render(view.contents, context, { state, component, variant });
  }
}

Fractal.version = require('../package.json').version;

module.exports = Fractal;
module.exports.Fractal = Fractal;
