const { titlize } = require('@frctl/fractalite-support/utils');

module.exports = function() {
  return function componentLabel({ components }) {
    components.forEach(component => {
      const config = component.config || {};
      component.label = config.label || titlize(config.name || component.root.name);
    });
  };
};
