const escape = require('escape-html');

module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    app.get('inspector.panels').push({
      label: opts.label || 'Props',
      content({ variant }) {
        const props = variant.previewProps.map(p => app.api.mergeProps(variant, p));
        const str = props.map(p => JSON.stringify(p, null, true)).join('\n');
        return `<pre><code>${escape(str)}</code></pre>`;
      }
    });
  };
};
