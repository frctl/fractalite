const { isFunction } = require('lodash');
const { map } = require('asyncro');
const { getComponent } = require('./helpers');

module.exports = function(state, adapter) {
  adapter = adapter || (() => '');
  const renderComponent = isFunction(adapter) ? adapter : adapter.render;

  if (!isFunction(renderComponent)) {
    throw new Error(`Adapter must provide a component render function`);
  }

  function render(component, props) {
    component = getComponent(state, component, true);
    return renderComponent(component, props, { ...state, component });
  }

  function renderToStaticMarkup(component, props) {
    if (isFunction(adapter.renderToStaticMarkup)) {
      return adapter.renderToStaticMarkup(component, props, { ...state, component });
    }
    return render(component, props);
  }

  function renderAll(target, props = []) {
    if (Array.isArray(props)) {
      return map(props, p => render(target, p));
    }
    return Promise.all([render(target, props)]);
  }

  function renderAllToStaticMarkup(target, props = []) {
    if (Array.isArray(props)) {
      return map(props, p => renderToStaticMarkup(target, p));
    }
    return Promise.all([renderToStaticMarkup(target, props)]);
  }

  return { render, renderAll, renderToStaticMarkup, renderAllToStaticMarkup };
};
