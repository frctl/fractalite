const { orderBy } = require('lodash');
const { resolveValue, mapValuesAsync } = require('@fractalite/support/utils');
const { isVariant, getComponentFromVariant, getTarget } = require('@fractalite/core/helpers');
const { map } = require('asyncro');

module.exports = function(app, adapter, opts = {}) {
  let panels = [];

  app.extend({
    addInspectorPanel(panel) {
      if (typeof panel.name !== 'string') {
        throw new TypeError(`Inspector panels must specify a .name property`);
      }
      const position = panels.length + 1;
      const noRender = panel.render === false;

      if (!noRender) {
        const tpl = panel.template;
        panel.template = () => app.utils.renderPage(resolveValue(tpl), {}, { template: true });
      }

      panels.push({ position, ...panel });
      return app;
    },

    removeInspectorPanel(name) {
      panels = panels.filter(p => p.name !== name);
      return app;
    },

    getInspectorPanels() {
      return orderBy(panels, 'position', 'asc');
    }
  });

  app.addRoute('api.inspect', '/api/inspect/:handle(.+).json', async (ctx, next) => {
    let component;
    let variant;
    const target = getTarget(ctx.state, ctx.params.handle);
    if (isVariant(target)) {
      variant = target;
      component = getComponentFromVariant(ctx.state, variant);
    } else {
      component = target;
    }
    const panels = await map(app.getInspectorPanels(), panel => {
      return mapValuesAsync(panel, value => resolveValue(value, { ...ctx.state, variant, component }));
    });
    ctx.body = {
      component,
      variant,
      preview: variant ? await app.utils.renderPreview(variant, variant.previewProps) : null,
      panels: panels.filter(panel => panel.template)
    };
    return next();
  });

  app.addRoute('inspect', '/inspect/:handle(.+)', (ctx, next) => ctx.render('app'));

  /*
     * Compiler middleware to add inspector url properties to variants
     */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.url = app.url('inspect', { handle: component });
      component.variants.forEach(variant => {
        variant.url = app.url('inspect', { handle: variant });
      });
    });
  });

  // App.addBuildStep('inspect', ({ requestRoute }) => {
  //   app.api.variants.forEach(variant => requestRoute('detail', { variant }));
  // });

  return app;
};
