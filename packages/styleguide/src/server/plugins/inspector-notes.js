const { defaultsDeep } = require('@fractalite/support/utils');
const { rewriteUrls } = require('@fractalite/support/html');
const { stripIndent } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorOverviewPlugin(app) {
    if (opts === false) return;

    app.addInspectorPanel({
      name: 'notes',
      label: opts.label || 'Notes',
      render: false,
      async template(state) {
        const { component } = state;
        let notes;

        if (typeof component.notes === 'string') {
          const { content, data } = app.utils.parseFrontMatter(component.notes);

          const renderOpts = defaultsDeep(data, {
            markdown: true,
            template: false
          });

          notes = await app.utils.renderPage(state, content, {}, renderOpts);

          // Rewrite relative URLs in output
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
      }
    });

    app.addCSS(stripIndent`
      .inspector-panel-notes {
        padding: 12px;
      }
    `);

    app.compiler.use(({ components }) => {
      components.forEach(component => {
        component.notes = component.notes || component.config.notes;
      });
    });
  };
};
