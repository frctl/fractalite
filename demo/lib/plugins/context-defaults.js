const { merge } = require('lodash');

module.exports = function contextDefaults() {
  return function(components) {
    components.forEach(component => {
      const defaultCtx = component.config.defaults || {};
      component.variants.forEach(variant => {
        variant.context = merge({}, defaultCtx, variant.context || {});
      });
    });
    return components;
  };
};
