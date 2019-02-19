const { slugify } = require('@frctl/fractalite-support/utils');

module.exports = function() {
  return function componentName({ components }) {
    components.forEach(component => {
      const config = component.config || {};
      component.name = slugify(config.name || component.root.name);
    });
  };
};
