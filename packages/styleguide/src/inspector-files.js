const { html } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorFilesPlugin(app) {
    if (opts === false) return;

    app.get('inspector.panels').push({
      label: opts.label || 'Files',
      content({ component }) {
        return html`
          <ul>
            ${component.files.map(
              file => `
              <li>
                <a href="${file.url}">${file.relative}</a>
              </li>
            `
            )}
          </ul>
        `;
      }
    });
  };
};
