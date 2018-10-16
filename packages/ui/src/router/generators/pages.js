module.exports = function(state) {
  return state.pages.map(p => {
    return { _: p.urlPath };
  });
};
