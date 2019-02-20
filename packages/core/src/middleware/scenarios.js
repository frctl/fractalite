const { titlize, slugify } = require('@frctl/fractalite-support/utils');
const deepFreeze = require('deep-freeze');

module.exports = function() {
  return function scenariosMiddleware(components) {
    components.forEach(component => {
      const scenarios = component.config.scenarios || [{ name: 'default' }];
      let counter = 0;
      component.scenarios = scenarios.map(config => {
        counter++;
        const name = slugify(config.name || `scenario-${counter}`);
        const label = config.label || titlize(name);
        const props = config.props || {};

        return {
          name,
          label,
          props,
          // Handle: name,
          config: deepFreeze(config)
        };
      });
    });
  };
};
