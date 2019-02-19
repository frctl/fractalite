const { orderBy } = require('lodash');
const { resolveValue, mapValuesAsync } = require('@frctl/fractalite-support/utils');
const { getContext, getComponent } = require('@frctl/fractalite-core/helpers');
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
        panel.template = state => app.utils.renderPage(resolveValue(tpl), state, { template: true });
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

  app.addRoute('api.inspect', '/api/inspect/:component/:context.json', async (ctx, next) => {
    const component = ctx.component;
    const context = getContext(component, ctx.params.context, true);

    const panels = await map(app.getInspectorPanels(), panel => {
      return mapValuesAsync(panel, value => resolveValue(value, { ...ctx.state, context, component }));
    });

    ctx.body = {
      component,
      context,
      preview: await app.utils.renderPreview(component, context),
      panels: panels.filter(panel => panel.template)
    };

    return next();
  });

  app.addRoute('inspect', '/inspect/:component/:context?', (ctx, next) => ctx.render('app'));

  /*
   * Compiler middleware to add inspector url properties
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.url = app.url('inspect', { component: component.name });
      component.contexts.forEach(context => {
        context.url = app.url('inspect', { component: component.name, context: context.name });
      });
    });
  });

  app.utils.addReferenceLookup('inspect', (state, identifier) => {
    const [componentName, contextName] = identifier.split('/');
    const component = getComponent(state, componentName, true);
    const context = contextName ? getContext(component, contextName, true) : component.contexts[0];
    return {
      url: app.url('inspect', { component, context: context.name })
    };
  });

  return app;
};
