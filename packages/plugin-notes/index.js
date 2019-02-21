const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const { rewriteUrls } = require('@frctl/fractalite-support/html');
const stripIndent = require('strip-indent');

module.exports = function(opts = {}) {
  return function inspectorNotesPlugin(app, compiler) {
    if (opts.notesFile) {
      /*
       * Compiler middleware to read notes content from notes files
       */
      compiler.use(async components => {
        const filePath = typeof opts.notesFile === 'string' ? opts.notesFile : 'notes.md';
        await Promise.all(
          components.map(async component => {
            const notesFile = component.files.find(file => file.relative === filePath);
            if (notesFile) {
              component.notes = await notesFile.getContents();
            }
          })
        );
      });
    }

    /*
     * Compiler middleware to extract notes from config.
     * Will override notes from the notesFile if supplied.
     */
    compiler.use(components => {
      components.forEach(component => {
        if (component.config.notes) {
          component.notes = stripIndent(component.config.notes);
        }
      });
    });

    app.addInspectorPanel({
      name: 'notes',
      label: opts.label,
      renderServer: false,
      async template(state) {
        const { component } = state;
        let notes;

        if (typeof component.notes === 'string') {
          /*
           * Notes are parsed in the same way as pages and can contain frontmatter
           * and reference tags.
           */
          const { content, data } = app.utils.parseFrontMatter(component.notes);

          const renderOpts = defaultsDeep(data, {
            markdown: true,
            template: false,
            refs: true
          });

          notes = await app.utils.renderPage(content, {}, renderOpts);

          // Rewrite relative URLs to src files in output
          notes = rewriteUrls(notes, path => {
            if (path.startsWith('./')) {
              const file = component.files.find(file => `./${file.relative}` === path);
              return file ? app.url('src', { file }) : path;
            }
          });
        } else {
          notes = '<em>No notes available</em>';
        }

        return `<div class="inspector-panel-notes fr-prose">${notes}</div>`;
      },

      css: `
        .inspector-panel-notes {
          padding: 12px;
        }
      `
    });
  };
};
