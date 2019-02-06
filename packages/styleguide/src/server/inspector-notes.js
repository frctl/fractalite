const { map } = require('asyncro');
const { defaultsDeep } = require('@fractalite/support/utils');
const { stripIndent } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorOverviewPlugin(app) {
    if (opts === false) return;

    const { styleguide, compiler } = app;
    const className = 'inspector-panel-notes';

    styleguide.addInspectorPanel({
      name: 'notes',
      label: opts.label || 'Notes',
      async template(ctx) {
        const { component, variant } = ctx;
        let notes;

        if (typeof component.notes === 'string') {
          const { content, data } = styleguide.parseFrontMatter(component.notes);
          const renderOpts = defaultsDeep(data, {
            markdown: true,
            template: false,
            localFiles: component.files,
            ctx
          });
          notes = await styleguide.renderPage(content, renderOpts);
        } else {
          notes = '<em>No notes available</em>';
        }

        return `<div class="${className} fr-prose">${notes}</div>`;
      }
    });

    styleguide.addCSS(stripIndent`
      .${className} {
        padding: 12px;
      }
    `);

    compiler.use(async ({ components }) => {
      await map(components, async component => {
        component.notes = component.notes || component.config.notes;
      });
    });
  };
};
