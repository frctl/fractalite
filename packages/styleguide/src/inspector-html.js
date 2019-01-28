const { readFile } = require('fs-extra');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app) {
    if (opts === false) return;

    const content = `
      <pre><code>{{ render(variant) | await }}</code></pre>
    `;

    app.get('inspector.panels').push({
      label: opts.label || 'HTML',
      content: opts.content || content
    });
  };
};
