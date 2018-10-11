const { titlize } = require('@fractalite/support/utils');

module.exports = function label() {
  return function(components) {
    return components.map(component => {
      const config = component.config || {};
      component.label = config.label || titlize(config.name || component.root.name);
      return component;
    });
  };
};
