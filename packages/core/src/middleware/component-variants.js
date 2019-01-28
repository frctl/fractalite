const { titlize, slugify, toArray } = require('@fractalite/support/utils');
const Variant = require('../entities/variant');

module.exports = function() {
  return async function componentVariants({ components }) {
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

        /*
          const previewProps = toArray(config.previewProps || {});
          if (previewProps.length === 0) {
            previewProps.push({}); // always need at least one set of previewProps
          }
        */

        return new Variant({ name, label, props, handle /*, previewProps */ });
      });
    });
  };
};
