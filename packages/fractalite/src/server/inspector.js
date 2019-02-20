const { orderBy } = require('lodash');
const { resolveValue, mapValuesAsync } = require('@frctl/fractalite-support/utils');
const { getScenario, getComponent } = require('@frctl/fractalite-core/helpers');
const { map } = require('asyncro');

module.exports = function(app, compiler, renderer, opts = {}) {
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

  app.addRoute('api.inspect', '/api/inspect/:component/:scenario.json', async (ctx, next) => {
    const { component } = ctx;
    const scenario = getScenario(component, ctx.params.scenario, true);

    const panels = await map(app.getInspectorPanels(), panel => {
      return mapValuesAsync(panel, value => resolveValue(value, { ...ctx.state, scenario, component }));
    });

    ctx.body = {
      component,
      scenario,
      preview: await app.utils.renderPreview(component, scenario),
      panels: panels.filter(panel => panel.template)
    };

    return next();
  });

  app.addRoute('inspect', '/inspect/:component/:scenario?', (ctx, next) => ctx.render('app'));

  /*
   * Compiler middleware to add inspector url properties
   */
  compiler.use(async (components, next) => {
    await next();
    components.forEach(component => {
      component.url = app.url('inspect', { component: component.name });
      component.scenarios.forEach(scenario => {
        scenario.url = app.url('inspect', { component: component.name, scenario: scenario.name });
      });
    });
  });

  app.utils.addReferenceLookup('inspect', (state, identifier) => {
    const [componentName, scenarioName] = identifier.split('/');
    const component = getComponent(state, componentName, true);
    const scenario = scenarioName ? getScenario(component, scenarioName, true) : component.scenarios[0];
    return {
      url: app.url('inspect', { component, scenario: scenario.name })
    };
  });

  return app;
};
