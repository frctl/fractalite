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

      const props = [];
      const propKeys = ['head', 'foot', 'contents'];
      for (const key of propKeys) {
        const str = component.preview[key] || '';
        props.push(this.renderString(str, { component, variants, variant }));
      }

      const resolvedProps = await Promise.all(props);

      for (let i = 0; i < propKeys.length; i++) {
        const key = propKeys[i];
        context[key] = stripIndent(resolvedProps[i]);
      }

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
