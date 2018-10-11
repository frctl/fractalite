const { flatten } = require('lodash');

module.exports.component = state => {
  return state.components.map(c => {
    return { component: c.name };
  });
};

module.exports.preview = state => {
  return flatten(
    state.components.map(c => {
      return [{ component: c.name }].concat(
        c.variants.map(v => {
          return { component: c.name, variant: v.name };
        })
      );
    })
  );
};

module.exports['component/variant'] = module.exports.preview;
