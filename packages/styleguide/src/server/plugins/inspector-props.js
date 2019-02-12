const { html, stripIndent } = require('common-tags');
const { mergeProps } = require('@fractalite/core/helpers');

module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    app.addInspectorPanel({
      name: 'props',

      label: opts.label || 'Props',

      template: html`
        <vue-json-pretty :data="panel.props" class="fr-json"></vue-json-pretty>
      `,

      props(state) {
        const { variant } = state;
        if (!variant) return;

        const items = variant.previewProps.map(props => mergeProps(state, variant, props));
        return items.length > 1 ? items : items[0];
      }
    });

    app.addCSS(stripIndent`
      .fr-json.vjs__tree {
        padding: 12px;
        font-size: 15px;
        line-height: 1.3;
        font-family: monospace;
      }
      .fr-json.vjs__tree .vjs__value__string {
        color: rgb(170, 17, 17);
      }
    `);
  };
};
