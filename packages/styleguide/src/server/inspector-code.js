const beautify = require('js-beautify');
const { defaultsDeep } = require('@fractalite/support/utils');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function inspectorCodePlugin(app) {
    if (opts === false) return;

    opts = defaultsDeep(opts, {
      prettify: {
        indent_size: 2,
        preserve_newlines: false
      }
    });

    const className = 'inspector-panel-code';

    app.get('inspector.panels').push({
      label: opts.label || 'Code',

      css: `
        .${className} {
          display: table;
          border-collapse: collapse;
          border: 1px solid transparent;
          width: 100%;
          height: 100%;
        }
        .${className}__row {
          display: table-row;
        }
        .${className}__row + .${className}__row {
          margin-top: 20px;
        }
        .${className}__col {
          display: table-cell;
          padding: 12px;
          border: 1px solid #e6e6e6;
          vertical-align: middle;
          width: 50%;
          overflow: auto;
        }
      `,

      async content({ variant }) {
        if (!variant) return;

        const previews = await map(variant.previewProps, async props => {
          let html = await app.api.render(variant, props);
          if (opts.prettify !== false) {
            html = beautify['html'](html, opts.prettify);
          }
          html = app.styleguide.highlightCode(html, 'html');

          let json = JSON.stringify(app.api.mergeProps(variant, props), null, 2);
          json = app.styleguide.highlightCode(json, 'json');

          return { html, json };
        });

        const rows = previews.map(preview => {
          return `
            <div class="${className}__row">
              <div class="${className}__col ${className}__json">${preview.json}</div>
              <div class="${className}__col ${className}__html">${preview.html}</div>
            </div>
          `;
        });

        return `<div class="${className}">${rows.join('\n')}</div>`;
      }
    });
  };
};
