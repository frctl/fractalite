const { slugify, normalizeName } = require('@frctl/fractalite-support/utils');

module.exports = function() {
  return function nameMiddleware(components) {
    components.forEach(component => {
      const config = component.config || {};
      component.name = slugify(normalizeName(config.name || component.name));
    });
  };
};
