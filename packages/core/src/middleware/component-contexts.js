const { titlize, slugify } = require('@frctl/fractalite-support/utils');
const deepFreeze = require('deep-freeze');

module.exports = function() {
  return function componentContexts({ components }) {
    components.forEach(component => {
      const contexts = component.config.contexts || [{ name: 'default' }];
      let counter = 0;
      component.contexts = contexts.map(config => {
        counter++;
        const name = slugify(config.name || `context-${counter}`);
        const label = config.label || titlize(name);
        const props = config.props || {};
        // const handle = function() {
        //   return this._handle || `${component.name}/${this.name}`;
        // };

        return {
          name,
          label,
          props,
          // handle: name,
          config: deepFreeze(config)
        };
      });
    });
  };
};
