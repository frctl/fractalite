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
      variants = [variant];
    } else {
      component = getComponent(params, state);
      variants = component.variants;
    }

    try {
      const context = { component, variants, variant };
      const contentTpl = component.preview.content || '';
      context.content = stripIndent(await this.renderString(contentTpl, context));

      for (const key of ['stylesheets', 'scripts']) {
        context[key] = component.preview[key];
      }

      if (isString(component.preview.view)) {
        return this.renderString(component.preview.view, context);
      }
      return this.render(route.view, context);
    } catch (err) {
      this.throw(`Error rendering preview template.\n${err.message}`, 400);
    }
  };
};
