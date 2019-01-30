module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app) {
    if (opts === false) return;

    const content = `
      <pre><code>{{ renderAll(variant, variant.previewProps) | await | join('\n') }}</code></pre>
    `;

    app.get('inspector.panels').push({
      label: opts.label || 'HTML',
      content: opts.content || content
    });
  };
};
