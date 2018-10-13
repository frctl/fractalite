const { Environment } = require('nunjucks');
const { each, get } = require('lodash');
const { extname } = require('path');
const remark = require('remark');
const html = require('remark-html');
const ViewLoader = require('./loader');

class Engine {
  constructor(opts = {}) {
    const viewLoader = new ViewLoader(opts.views || [], {
      noCache: !opts.cache
    });
    const engine = new Environment(viewLoader);
    this._loader = viewLoader;
    this._engine = engine;
    this._opts = opts;
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

  async render(path, context = {}, opts = {}) {
    const md = opts.markdown;
    if (md === 'pre') {
      const html = await this.renderMarkdownFile(path);
      return this.renderString(html, context);
    }
    if (md === true || md === 'post' || (md !== false && extname(path) === '.md')) {
      const html = await this.renderFile(path, context);
      return this.renderMarkdownString(html);
    }
    return this.renderFile(path, context);
  }

  async renderMarkdownString(str) {
    const opts = get(this._opts, 'markdown.opts', {});
    const plugins = get(this._opts, 'markdown.plugins', []);
    const output = await remark()
      .data('settings', opts)
      .use(html)
      .use(plugins)
      .process(str);
    return String(output);
  }

  renderMarkdownFile(path) {
    const file = this._loader.getSource(path);
    if (!file) {
      throw new Error(`Could not find file '${path}'`);
    }
    return this.renderMarkdownString(file.src);
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

  renderFile(path, context = {}) {
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
