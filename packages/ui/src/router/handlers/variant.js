const { getComponentAndVariant } = require('./utils');

module.exports = function(route) {
  return function({ params, state }) {
    const { component, variant } = getComponentAndVariant(params, state);
    return this.render(route.view, { component, variant });
  };
};
