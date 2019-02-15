const { flatMap } = require('lodash');

module.exports = function({ components = [], assets = [] } = {}) {
  const state = { components, assets };

  Object.defineProperty(state, 'files', {
    get() {
      return [...flatMap(state.components, component => component.files), ...assets];
    },
    enumerable: true
  });

  state.update = ({ components = [], assets = [] } = {}) => {
    state.components = components;
    state.assets = assets;
    return state;
  };

  return state;
};
