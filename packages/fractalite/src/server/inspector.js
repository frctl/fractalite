const { orderBy, merge, isString } = require('lodash');
const { titlize, resolveValue, mapValuesAsync } = require('@frctl/fractalite-support/utils');
const { getScenarioOrDefault, getScenario, getComponent } = require('@frctl/fractalite-core/helpers');
const { map } = require('asyncro');

module.exports = function(app, compiler, adapter, opts = {}) {
  let panels = [];

  app.extend({
    addInspectorPanel(panel) {
      if (typeof panel.name !== 'string') {
        throw new TypeError(`Inspector panels must specify a .name property`);
      }

      const panelDefaults = {
        label: titlize(panel.name),
        position: panels.length + 1,
        renderServer: true,
        renderClient: false,
        props: {},
        template: ''
      };

      panel = merge({}, panelDefaults, panel);

      if (isString(panel.templateFile)) {
        panel.template = async () => {
          const tpl = await app.views.getTemplateAsync(panel.templateFile);
          return tpl.tmplStr;
        };
      }

      if (panel.renderServer) {
        const tpl = panel.template;
        panel.template = async ctx => {
          const tplString = await resolveValue(tpl, ctx);
          return app.utils.renderPage(tplString, { ...ctx, panel }, { template: true });
        };
      }

      if (isString(panel.css)) {
        app.addCSS(panel.css);
      }

      if (isString(panel.js)) {
        app.addJS(panel.js);
      }

      panels.push(panel);
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
    let scenario;

    try {
      scenario = getScenarioOrDefault(component, ctx.params.scenario);
    } catch (err) {
      err.status = 404;
      throw err;
    }

    const panels = await map(app.getInspectorPanels(), panel => {
      return mapValuesAsync(panel, value => resolveValue(value, { ...ctx.state, scenario, component }));
    });

    ctx.body = {
      preview: await app.utils.renderPreview(component, scenario),
      panels: panels.filter(panel => panel.template)
    };

    return next();
  });

  app.addBuilder((state, { request }) => {
    state.components.forEach(component => {
      component.scenarios.forEach(scenario => {
        request({ name: 'api.inspect', params: { component, scenario: scenario.name } });
      });
    });
  });

  app.addRoute('inspect', '/inspect/:component/:scenario?', (ctx, next) => ctx.render('app'));

  /*
   * Compiler middleware to add inspector url properties
   */
  compiler.use(async (components, next) => {
    await next();
    components.forEach(component => {
      component.url = app.url('inspect', { component: component.name, scenario: component.scenarios[0].name });
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
