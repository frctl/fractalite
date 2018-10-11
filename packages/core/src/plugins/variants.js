const { titlize, slugify } = require('@fractalite/support/utils');

module.exports = function variants(opts = {}) {
  return function(components) {
    return Promise.all(
      components.map(component => {
        const variants = component.config.variants || [{ name: 'default' }];
        let counter = 0;
        component.variants = variants.map(config => {
          counter++;
          const name = slugify(config.name || `${component.name}-${counter}`);
          const label = config.label || titlize(name);
          const context = config.context || {};

          const variant = { name, label, context };
          Object.defineProperty(variant, '_component', {
            get() {
              return component.name;
            }
          });
          return variant;
        });
        return component;
      })
    );
  };
};
