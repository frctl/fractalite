module.exports = function(state) {
  return state.components.map(c => {
    return { component: c.name };
  });
};
