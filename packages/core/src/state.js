const { flatMap } = require('lodash');

module.exports = function(initial = {}) {
  const state = {
    components: [],
    files: []
  };

  state.update = props => {
    Object.assign(state, props);
    return state;
  };

  state.update(initial);

  return state;
};
