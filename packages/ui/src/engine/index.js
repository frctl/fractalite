const { Environment } = require('nunjucks');
const { each } = require('lodash');
const ViewLoader = require('./loader');

class Engine {
  constructor(opts = {}) {
    const engine = new Environment(
      new ViewLoader(opts.views || [], {
        noCache: !opts.cache
      })
    );
    this._engine = engine;
    each(opts.globals || {}, (val, name) => engine.addGlobal(name, val));
  }

  setGlobal(name, value) {
    this._engine.addGlobal(name, value);
    return this;
  }

  addFilters(filters = {}) {
    each(filters, (filter, name) => {
      this._engine.addFilter(name, filter, Boolean(filter.async));
    });
    return this;
  }

  addHelpers(helpers = {}) {
    each(helpers, (helper, name) => this._engine.addGlobal(name, helper));
    return this;
  }

  addExtensions(extensions = {}) {
    each(extensions, (ext, name) => this._engine.addExtension(name, ext));
    return this;
  }

  renderString(str, context = {}) {
    return new Promise((resolve, reject) => {
      this._engine.renderString(str, context, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  render(path, context = {}) {
    return new Promise((resolve, reject) => {
      this._engine.render(path, context, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = Engine;
