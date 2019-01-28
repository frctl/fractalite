const { readFile } = require('fs-extra');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function inspectorNotesPlugin(app) {
    if (opts === false) return;

    const filename = (opts.filename || 'readme.md').toLowerCase();

    const content = `
      <div>
      {{ component.notes | default('_No notes available_') | markdown | safe }}
      </div>
    `;

    app.get('inspector.panels').push({
      label: opts.label || 'Notes',
      display: ({ component }) => component.notes,
      content: opts.content || content
    });

    app.compiler.use(async function({ components }) {
      await map(components, async component => {
        const readme = component.files.find(file => file.basename.toLowerCase() === filename);
        if (readme) {
          component.notes = await readFile(readme.path, 'utf-8');
        }
      });
    });
  };
};
