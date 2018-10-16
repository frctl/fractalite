const { get, isString, isFunction, cloneDeep } = require('lodash');
const watch = require('glob-watcher');
const { EventEmitter2 } = require('eventemitter2');
const { defaultsDeep } = require('@fractalite/support/utils');
const resolveConfig = require('./config');
const Logger = require('./logger');
const Parser = require('./parser');
const State = require('./state');

class Fractal {
  constructor(config = {}) {
    this._config = resolveConfig(config);

    this._state = new State();
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
    const logger = new Logger(this._emitter);
    this._parser.use(attacher.name, plugin.bind(logger));
    return this;
  }

  init() {
    return this.updateState();
  }

  async updateState() {
    this._state.update(await this.parser.run());
    return this._state;
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
      context = opts.merge === false ? context : defaultsDeep(context, variant.context);
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
