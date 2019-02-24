const { flatMap } = require('lodash');

module.exports = function(initial = {}) {
  const state = {
    components: []
  };

  Object.defineProperty(state, 'files', {
    get() {
      return flatMap(state.components, component => component.files);
    },
    enumerable: true
  });

  state.update = props => {
    Object.assign(state, props);
    return state;
  };

  state.update(initial);

  return state;
};
