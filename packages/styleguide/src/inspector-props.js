const escape = require('escape-html');
const hljs = require('highlight.js');

module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    app.get('inspector.panels').push({
      label: opts.label || 'Props',
      content({ variant }) {
        const props = variant.previewProps.map(p => app.api.mergeProps(variant, p));
        const str = props.map(p => JSON.stringify(p, null, 2)).join('\n');
        const highlighted = hljs.highlight('json', str);
        return `<pre><code class="fr-code hljs json">${highlighted.value}</code></pre>`;
      }
    });
  };
};
