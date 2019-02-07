const { orderBy } = require('lodash');
const { resolveValue, mapValuesAsync } = require('@fractalite/support/utils');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return async function inspectorPlugin(app) {
    const { styleguide } = app;

    app.set('inspector', {
      panels: []
    });

    styleguide.addInspectorPanel = panel => {
      if (typeof panel.name !== 'string') {
        throw new Error(`Inspector panels must specify a .name property`);
      }
      const panels = app.get('inspector.panels');
      const position = panels.length + 1;
      panels.push({ position, ...panel });
    };

    styleguide.removeInspectorPanel = name => {
      const remainingPanels = app.get('inspector.panels').filter(p => p.name !== name);
      app.set('inspector.panels', remainingPanels);
    };

    styleguide.getInspectorPanels = () => orderBy(app.get('inspector.panels'), 'position', 'asc');

    app.addRoute('api.inspect', '/api/inspect/:handle(.+).json', async (ctx, next) => {
      let { component, variant } = ctx.api.resolveComponent(ctx.params.handle);
      const panels = await map(styleguide.getInspectorPanels(), panel => {
        const state = { ...ctx.state, variant, component };
        return mapValuesAsync(panel, value => resolveValue(value, state));
      });
      ctx.body = {
        component: component,
        variant: variant,
        preview: variant ? await styleguide.renderPreview(variant, variant.previewProps) : null,
        panels: panels.filter(panel => panel.template)
      };
      return next();
    });

    app.addRoute('inspect', '/inspect/:handle(.+)', (ctx, next) => ctx.render('app'));

    // app.addBuildStep('inspect', ({ requestRoute }) => {
    //   app.api.variants.forEach(variant => requestRoute('detail', { variant }));
    // });

    return app;
  };
};
