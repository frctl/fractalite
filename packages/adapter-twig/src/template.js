const { extname } = require('path');
const { mergeProps, getComponent, getScenario } = require('@frctl/fractalite-core/helpers');
const { TwingTemplate, merge } = require('twing');

module.exports = function(state) {
  class FractalTemplate extends TwingTemplate {
    constructor(env) {
      super(env);
    }

    /*
     * If the template requested is representing a 'scenario' then
     * merge the scenario props with any context first.
     */
    display(context, ...args) {
      const handle = this.getTemplateName();
      const pathParts = handle.split('/');
      if (!extname(handle) && pathParts.length === 2) {
        const [componentName, scenarioName] = pathParts;

        const component = getComponent(state, componentName, true);
        const scenario = getScenario(component, scenarioName, true);

        context = merge(scenario.props, context);
      }
      return super.display(context, ...args);
    }
  }

  return FractalTemplate;
};
