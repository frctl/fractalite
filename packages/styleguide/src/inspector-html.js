const escape = require('escape-html');

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app) {
    if (opts === false) return;

    app.get('inspector.panels').push({
      label: opts.label || 'HTML',
      async content({ variant }) {
        const html = await app.api.renderAll(variant, variant.previewProps);
        return `<pre><code>${escape(html)}</code></pre>`;
      }
    });
  };
};
