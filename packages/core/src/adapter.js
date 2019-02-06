const { cloneDeep } = require('lodash');
const { html } = require('common-tags');
const { matchOne } = require('@fractalite/support/helpers');

const defaults = {
  view: ['view.*', '{name}.view.*']
};

class Adapter {
  constructor(opts = {}) {
    this.opts = Object.assign({}, defaults, opts);
    this.hooks = {
      'pre-render': [],
      'post-render': [],
      'pre-preview': [],
      'post-preview': []
    };
  }

  /**
   * Must be implemented by child classes to perform the
   * actual template rendering.
   */
  async renderComponent(component, props, ctx) {
    throw new Error('Adapter.renderComponent must be implemented by the template engine adapter');
  }

  /**
   * Get the template source code for a component as a string.
   */
  getSourceString(component, ctx) {
    const view = matchOne(component.files, 'basename', this.opts.view, component);
    return view ? view.getContents() : '';
  }

  wrapInPreview(content, opts, ctx) {
    const { stylesheets = [], scripts = [], css = [], js = [], meta = {} } = opts;
    return html`
      <!DOCTYPE html>
      <html lang="${meta.lang || 'en'}" dir="${meta.dir || 'ltr'}">
      <head>
        <meta charset="${meta.charset || 'utf-8'}">
        <meta name="viewport" content="${meta.viewport || 'width=device-width, initial-scale=1.0'}">
        ${stylesheets.map(url => `<link rel="stylesheet" href="${url}">`)}
        ${css.map(code => `<style>${code}</style>`)}
        <title>${meta.title || 'Preview'}</title>
      </head>
      <body>
        ${content}
        ${scripts.map(url => `<script src="${url}"></script>`)}
        ${js.map(code => `<script>${code}</script>`)}
      </body>
      </html>
    `;
  }

  async preview(html, opts, ctx) {
    html = await applyHooks(this.hooks['pre-preview'], html, ctx);
    html = await this.wrapInPreview(html, opts, ctx);
    return applyHooks(this.hooks['post-preview'], html, ctx);
  }

  async render(component, props, ctx) {
    props = await applyHooks(this.hooks['pre-render'], props, { ...ctx, component });
    let html = await this.renderComponent(component, props, ctx);
    return applyHooks(this.hooks['post-render'], html, { ...ctx, component });
  }

  addHook(type, hook) {
    if (!this.hooks[type]) {
      throw new Error(`'${type}' is not a valid adapter hook`);
    }
    this.hooks[type].push(hook);
  }
}

async function applyHooks(hooks, target, ctx) {
  for (const hook of hooks) {
    // eslint-disable-next-line no-await-in-loop
    target = await hook(target, ctx);
  }
  return target;
}

module.exports = Adapter;
