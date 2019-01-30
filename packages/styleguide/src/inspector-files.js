module.exports = function(opts = {}) {
  return function inspectorFilesPlugin(app) {
    if (opts === false) return;

    const content = `
      <div>
      <ul>
        {% for file in component.files %}
          <li><a href="{{ file.url }}">{{ file.relative }}</a></li>
        {% endfor %}
      </ul>
      </div>
    `;

    app.get('inspector.panels').push({
      label: opts.label || 'Files',
      content: opts.content || content
    });
  };
};
