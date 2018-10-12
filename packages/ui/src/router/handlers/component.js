const { getComponent } = require('./utils');

module.exports = function(route) {
  return ({ params, state, engine }) => {
    const component = getComponent(params, state);
    return engine.render(route.view, { component });
  };
};
