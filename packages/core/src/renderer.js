const { mergeProps, getTarget, getComponentFromVariant } = require('./helpers');
const { isVariant, isComponent } = require('./helpers');
const { map } = require('asyncro');

module.exports = function(state, adapter) {
  adapter = adapter || (() => '');
  const renderComponent = typeof adapter === 'function' ? adapter : adapter.renderComponent;

  function render(target, props) {
    target = getTarget(state, target, true);
    if (isComponent(target)) {
      return renderComponent(target, props, { ...state, component: target });
    }
    if (isVariant(target)) {
      const component = getComponentFromVariant(state, target);
      const mergedProps = mergeProps(state, target, props);
      return renderComponent(component, mergedProps, { ...state, variant: target, component });
    }
    throw new Error(`Invalid render target`);
  }

  async function renderAll(target, props = []) {
    if (Array.isArray(props)) {
      return await map(props, p => render(target, p));
    } else {
      return await Promise.all([render(target, props)]);
    }
  }

  return { render, renderAll };
};
