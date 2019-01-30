const { titlize, slugify } = require('@fractalite/support/utils');
const deepFreeze = require('deep-freeze');
const Variant = require('../entities/variant');

module.exports = function() {
  return function componentVariants({ components }) {
    components.forEach(component => {
      const variants = component.config.variants || [{ name: 'default' }];
      let counter = 0;
      component.variants = variants.map(config => {
        counter++;
        const name = slugify(config.name || `variant-${counter}`);
        const label = config.label || titlize(name);
        const props = config.props || {};
        const handle = function() {
          return this._handle || `${component.name}/${this.name}`;
        };

        return new Variant({
          name,
          label,
          props,
          handle,
          config: deepFreeze(config)
        });
      });
    });
  };
};
