module.exports = function(opts = {}) {
  return function inspectorPropsPlugin(app) {
    if (opts === false) return;

    app.addInspectorPanel({
      name: 'props',
      label: opts.label || 'Props',
      renderClient: true,
      template: `
        <json-explorer :data="panel.props"></json-explorer>
      `,
      props(state) {
        const { scenario } = state;
        const { props } = scenario.preview;
        return props.length > 1 ? props : props[0];
      }
    });
  };
};
