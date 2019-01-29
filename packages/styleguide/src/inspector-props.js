const { readFile } = require('fs-extra');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    const content = `

      <pre><code>{% for props in variant.previewProps %}
      {{ mergeProps(variant, props) | dump }}
      {% endfor %}</code></pre>
    `;

    app.get('inspector.panels').push({
      label: opts.label || 'Props',
      content: opts.content || content
    });
  };
};
