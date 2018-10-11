const { slugify } = require('@fractalite/support/utils');

module.exports = function name() {
  return function(components) {
    return components.map(component => {
      const config = component.config || {};
      component.name = slugify(config.name || component.root.name);
      return component;
    });
  };
};
