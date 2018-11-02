const { isString } = require('lodash');
const stripIndent = require('strip-indent');
const { getComponent, getComponentAndVariant } = require('./utils');

module.exports = function(route) {
  return async function({ params, state }) {
    let component;
    let variant;
    let variants = [];

    if (params.variant) {
      const targets = getComponentAndVariant(params, state);
      component = targets.component;
      variant = targets.variant;
    } else {
      component = getComponent(params, state);
    }

    try {
      let { content, meta } = component.preview;
      const context = { component, variants, variant, meta };

      for (const key of ['stylesheets', 'scripts']) {
        context[key] = component.preview[key];
      }

      if (route.view) {
        return this.render(route.view, context);
      }

      return this.render(component.preview[variant ? 'variant' : 'component'], context);
    } catch (err) {
      this.throw(`Error rendering preview template.\n${err.message}`, 400);
    }
  };
};
