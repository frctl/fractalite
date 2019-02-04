const { map } = require('asyncro');
const { defaultsDeep } = require('@fractalite/support/utils');
const { html } = require('common-tags');

const defaultNotesTemplate = `
<h4>Variants:</h4>
<ul>
  {% for var in component.variants %}
  <li>
    {% if variant.name == var.name %}<strong>{{ var.label }}</strong>{% else %}{{ var.label }}{% endif %}
    (<a href="{{ var.url }}">Inspect</a>,
    <a href="{{ var.previewUrl }}" target="_blank">Preview</a>)
  </li>
  {% endfor %}
</ul>
`;

module.exports = function(opts = {}) {
  return function inspectorOverviewPlugin(app) {
    if (opts === false) return;

    const className = 'inspector-panel-overview';

    const defaultNotes = opts.notes || defaultNotesTemplate;

    app.get('inspector.panels').push({
      label: opts.label || 'Overview',
      // TODO: extract out common panel styles/layouts
      css: `
        .${className} {
          padding: 12px;
        }
        .${className}__header {
          display: flex;
          border-bottom: 1px solid #ddd;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .${className}__title {
          font-size: 20px;
        }
        .${className}__action {
          margin-left: auto;
          font-size: 14px;
        }
      `,
      async content(ctx) {
        const { component, variant } = ctx;
        let notes;

        if (typeof component.notes === 'string') {
          const { content, data } = app.utils.parseFrontMatter(component.notes);

          const renderOpts = defaultsDeep(data, {
            markdown: true,
            template: false,
            localFiles: component.files,
            ctx
          });

          notes = await app.utils.renderPage(content, renderOpts);
        } else {
          notes = await app.utils.renderPage(defaultNotes, {
            template: true,
            localFiles: component.files,
            ctx
          });
        }

        return html`
          <div class="${className}">
            <div class="${className}__header">
              <h2 class="${className}__title">${component.label}</h2>
            </div>
            ${notes ? `<div class="${className}__notes fr-prose">${notes}</div>` : ''}
          </div>
        `;
      }
    });

    app.compiler.use(async ({ components }) => {
      await map(components, async component => {
        component.notes = component.notes || component.config.notes;
      });
    });
  };
};
