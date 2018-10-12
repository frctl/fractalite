const UiError = require('../../error');

function getComponent(params = {}, state = {}) {
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

module.exports = { getComponent, getComponentAndVariant };
