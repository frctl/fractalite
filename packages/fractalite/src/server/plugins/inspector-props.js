module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    app.addInspectorPanel({
      name: 'props',
      label: opts.label || 'Props',
      renderClient: true,
      renderServer: false,
      template: `
        <vue-json-pretty :data="panel.props" class="fr-json"></vue-json-pretty>
      `,
      props(state) {
        const { scenario } = state;
        const { props } = scenario.preview;
        return props.length > 1 ? props : props[0];
      },
      css: `
        .fr-json.vjs__tree {
          padding: 12px;
          font-size: 15px;
          line-height: 1.3;
          font-family: monospace;
        }
        .fr-json.vjs__tree .vjs__value__string {
          color: rgb(170, 17, 17);
        }
      `
    });
  };
};
