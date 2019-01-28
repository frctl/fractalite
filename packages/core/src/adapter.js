const { isFunction } = require('lodash');
const tags = require('@fractalite/support/html');
const { html } = require('common-tags');

const defaults = {
  view: ['view.*', '{name}.view.*']
};

class Adapter {
  constructor(opts = {}) {
    this.opts = Object.assign({}, defaults, opts);
    this.formatters = [];
  }

  use(formatter) {
    this.formatters.push(formatter);
  }

  /**
   * Get the template source code for a component as a string.
   */
  getSourceString(component, ctx) {
    const view = component.files.matchOne('basename', this.opts.view, component);
    return view ? view.getContents() : null;
  }

  async render(component, props, ctx) {
    let html = await this.renderComponent(component, props, ctx);
    for (const formatter of this.formatters) {
      html = await formatter(html, { component, ...ctx });
    }
    return html;
  }

  renderComponent(component, props, ctx) {
    return this.getSourceString(component, ctx);
  }

  async renderPreview(content, props) {
    const { stylesheets = [], scripts = [], meta = {} } = props;
    return html`
      <!DOCTYPE html>
      <html lang="${meta.lang || 'en'}" dir="${meta.dir || 'ltr'}">
      <head>
        <meta charset="${meta.charset || 'utf-8'}">
        <meta name="viewport" content="${meta.viewport || 'width=device-width, initial-scale=1.0'}">
        ${stylesheets.map(tags.stylesheet)}
        <title>${meta.title || 'Preview'}</title>
      </head>
      <body>
        ${content}
        ${scripts.map(tags.script)}
      </body>
      </html>
    `;
  }
}

module.exports = Adapter;
