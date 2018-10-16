const { normalizePath } = require('@fractalite/support/utils');
const read = require('./read');
const transform = require('./transform');

class Parser {
  constructor(src, opts = {}) {
    this._src = normalizePath(src);
    this._opts = opts;
    this._plugins = [];
  }

  use(name, plugin) {
    if (!name) {
      throw new Error(`Missing plugin name`);
    }
    const existingPlugin = this._plugins.find(p => p.name === name);
    if (existingPlugin) {
      existingPlugin.plugin = plugin;
    } else {
      this._plugins.push({ name, plugin });
    }
    return this;
  }

  read() {
    return read(this._src, this._opts);
  }

  async transform(files) {
    let components = transform(files);
    for (const { plugin, name } of this._plugins) {
      // eslint-disable-next-line no-await-in-loop
      components = await plugin(components, { files });
    }
    return components;
  }

  async run() {
    const files = await this.read();
    const components = await this.transform(files);
    return { components, files };
  }
}

module.exports = Parser;
