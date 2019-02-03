const escape = require('escape-html');
const beautify = require('js-beautify');
const hljs = require('highlight.js');
const { defaultsDeep } = require('@fractalite/support/utils');

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, {
    prettify: {
      indent_size: 2,
      preserve_newlines: false
    }
  });

  return function inspectorHTMLPlugin(app) {
    if (opts === false) return;

    app.get('inspector.panels').push({
      label: opts.label || 'HTML',
      async content({ variant }) {
        let html = await app.api.renderAll(variant, variant.previewProps);
        if (opts.prettify !== false) {
          html = beautify['html'](html, opts.prettify);
        }
        const highlighted = hljs.highlight('html', html);
        return `<pre><code class="fr-code hljs html">${highlighted.value}</code></pre>`;
      }
    });
  };
};
