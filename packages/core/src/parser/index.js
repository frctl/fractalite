const { normalizePath } = require('@fractalite/support/utils');
const read = require('./read');
const transform = require('./transform');

class Parser {
  constructor(src, opts = {}) {
    this._src = normalizePath(src);
    this._opts = opts;
    this._plugins = [];
  }

  use(plugin) {
    this._plugins = this._plugins.concat(plugin);
    return this;
  }

  read() {
    return read(this._src, this._opts);
  }

  async transform(files) {
    let components = transform(files);
    for (const plugin of this._plugins) {
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
