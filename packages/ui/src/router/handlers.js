const { isString } = require('lodash');
const stripIndent = require('strip-indent');
const UiError = require('../error');

module.exports.component = route => {
  return ({ params, state, engine }) => {
    const component = state.components.find(c => c.name === params.component);
    if (component) {
      return engine.render(route.view, { component });
    }
    throw new UiError(`Component '${params.component}' not found`, 404);
  };
};

module.exports['component/variant'] = route => {
  return ({ params, state, engine, app }) => {
    const ctx = getComponentAndVariant(params, state);
    return engine.render(route.view, ctx);
  };
};

module.exports.preview = route => {
  return async ({ params, state, engine, app, config }) => {
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

    const context = { component, variants, variant };

    const props = [];
    const propKeys = ['head', 'foot', 'contents'];
    for (const key of propKeys) {
      const str = component.preview[key] || '';
      props.push(engine.renderString(str, { component, variants, variant }));
    }

    const resolvedProps = await Promise.all(props);

    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i];
      context[key] = stripIndent(resolvedProps[i]);
    }

    if (isString(component.preview.view)) {
      return engine.renderString(component.preview.view, context);
    }
    return engine.render(route.view, context);
  };
};

function getComponent(params, state) {
  const component = state.components.find(c => c.name === params.component);
  if (!component) {
    throw new UiError(`Component '${params.component}' not found`, 404);
  }
  return component;
}

function getComponentAndVariant(params = {}, state = {}) {
  const component = getComponent(params, state);
  const variant = component.variants.find(v => v.name === params.variant);
  if (variant) {
    return { component, variant };
  }
  throw new UiError(`Variant '${params.variant}' not found`, 404);
}
