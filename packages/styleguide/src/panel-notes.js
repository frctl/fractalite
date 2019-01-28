const { readFile } = require('fs-extra');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  const filename = (opts.filename || 'readme.md').toLowerCase();

  return function notesPlugin(app) {
    const content = `
      <div>
      {{ component.notes | default('_No notes available_') | markdown | safe }}
      </div>
    `;

    app.get('component.panels').push({
      label: opts.label || 'Notes',
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
