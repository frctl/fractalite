/* eslint camelcase: "off" */

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app, compiler, adapter) {
    if (opts === false) return;

    const prettify = opts.prettify !== false;

    app.addInspectorPanel({
      name: 'html',
      label: opts.label || 'HTML',
      renderClient: true,
      template: `
        <source-code :value="panel.props.html.join('\\n\\n')" :options="{ mode: 'htmlmixed' }" />
      `,
      async props(state) {
        const { scenario, component } = state;
        let items = await adapter.renderAllToStaticMarkup(component, scenario.preview.props);
        items = items.map(item => (prettify ? app.utils.prettify(item, 'html') : item));
        return { html: items };
      }
    });
  };
};
