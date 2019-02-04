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
    return view ? view.getContents() : '';
  }

  async render(component, props, ctx) {
    let html = await this.renderComponent(component, props, ctx);
    for (const formatter of this.formatters) {
      // eslint-disable-next-line no-await-in-loop
      html = await formatter(html, { component, ...ctx });
    }
    return html;
  }

  renderComponent(component, props, ctx) {
    return this.getSourceString(component, ctx);
  }

  generatePreview(content, opts, ctx) {
    const { stylesheets = [], scripts = [], meta = {} } = opts;
    return html`
      <!DOCTYPE html>
      <html lang="${meta.lang || 'en'}" dir="${meta.dir || 'ltr'}">
      <head>
        <meta charset="${meta.charset || 'utf-8'}">
        <meta name="viewport" content="${meta.viewport || 'width=device-width, initial-scale=1.0'}">
        ${stylesheets.map(url => `<link rel="stylesheet" href="${url}">`)}
        <title>${meta.title || 'Preview'}</title>
      </head>
      <body>
        ${content}
        ${scripts.map(url => `<script src="${url}"></script>`)}
      </body>
      </html>
    `;
  }
}

module.exports = Adapter;
