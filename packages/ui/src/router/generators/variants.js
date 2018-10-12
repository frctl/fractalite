const { flatten } = require('lodash');

module.exports = function(state) {
  return flatten(
    state.components.map(c => {
      return c.variants.map(v => {
        return { component: c.name, variant: v.name };
      });
    })
  );
};
