const { orderBy, isString } = require('lodash');
const { resolveValue, mapValuesAsync } = require('@fractalite/support/utils');
const {
  resolveReference,
  isVariant,
  getComponentFromVariant,
  getTarget
} = require('@fractalite/core/helpers');
const { map } = require('asyncro');

module.exports = function(app, adapter, opts = {}) {
  const panels = [];

  app.extend({
    addInspectorPanel(panel) {
      if (typeof panel.name !== 'string') {
        throw new Error(`Inspector panels must specify a .name property`);
      }
      const position = panels.length + 1;
      const noRender = panel.render === false;

      if (!noRender) {
        const tpl = panel.template;
        panel.template = function(state) {
          return app.utils.renderPage(state, resolveValue(tpl), {}, { template: true });
        };
      }

      panels.push({ position, ...panel });
      return app;
    },

    removeInspectorPanel() {
      panels = panels.filter(p => p.name !== name);
      return app;
    },

    getInspectorPanels() {
      return orderBy(panels, 'position', 'asc');
    }
  });

  app.addRoute('api.inspect', '/api/inspect/:handle(.+).json', async (ctx, next) => {
    let component, variant;
    let target = getTarget(ctx.state, ctx.params.handle);
    if (isVariant(target)) {
      variant = target;
      component = getComponentFromVariant(ctx.state, variant);
    } else {
      component = target;
    }
    const panels = await map(app.getInspectorPanels(), panel => {
      return mapValuesAsync(panel, value =>
        resolveValue(value, { ...ctx.state, variant, component })
      );
    });
    ctx.body = {
      component: component,
      variant: variant,
      preview: variant
        ? await app.utils.renderPreview(ctx.state, variant, variant.previewProps)
        : null,
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

  // app.addBuildStep('inspect', ({ requestRoute }) => {
  //   app.api.variants.forEach(variant => requestRoute('detail', { variant }));
  // });

  return app;
};
