const { get, isString, isFunction, cloneDeep } = require('lodash');
const watch = require('glob-watcher');
const { defaultsDeep } = require('@fractalite/support/utils');
// const State = require('@fractalite/support/state');
const resolveConfig = require('./resolve-config');
const Emitter = require('./emitter');
const Parser = require('./parser');

class Compiler {
  constructor(name, config = {}) {
    this._name = name;
    this._config = resolveConfig(config);

    this._parser = new Parser(this.get('src.paths'), this.get('src.opts'));
    this._emitter = new Emitter(this.name);
    this._watcher = null;
    this._watchCallbacks = [];
    this._plugins = [];
    this._transform = this.get('transform');

    for (const pluginDef of this.get('plugins')) {
      this.use(...pluginDef);
    }
  }

  get name() {
    return this._name;
  }

  get parser() {
    return this._parser;
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
    return get(this._config, path, fallback);
  }

  use(attacher, opts = {}, ...ctx) {
    const { name } = attacher;
    if (!name) {
      throw new Error(`Missing plugin name`);
    }

    const options = defaultsDeep(this.get(`pluginOpts.${name}`, {}), opts);
    const plugin = attacher(options, ...ctx).bind(this._emitter);

    const existingPlugin = this._plugins.find(p => p.name === name);
    if (existingPlugin) {
      existingPlugin.plugin = plugin;
    } else {
      this._plugins.push({ name, plugin });
    }

    return this;
  }

  async run() {
    this.emitter.debug('Compilation started');
    const files = await this.parser.run();
    let output = await this._transform(files);
    for (const { plugin } of this._plugins) {
      // eslint-disable-next-line no-await-in-loop
      output = await plugin(output, { files });
    }
    this.emitter.debug('Compilation complete');
    return output;
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
        const result = await this.run();
        await Promise.all(this._watchCallbacks.map(cb => cb(result)));
      } catch (err) {
        this.emit('error', err);
      }
    });
    return this;
  }
}

module.exports = Compiler;
