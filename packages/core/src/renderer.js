const { map } = require('asyncro');
const { mergeProps, getComponent } = require('./helpers');

module.exports = function(state, adapter) {
  adapter = adapter || (() => '');
  const renderComponent = typeof adapter === 'function' ? adapter : adapter.renderComponent;

  function render(component, props) {
    component = getComponent(state, component, true);
    return renderComponent(component, props, { ...state, component });
  }

  function renderAll(target, props = []) {
    if (Array.isArray(props)) {
      return map(props, p => render(target, p));
    }
    return Promise.all([render(target, props)]);
  }

  return { render, renderAll };
};
