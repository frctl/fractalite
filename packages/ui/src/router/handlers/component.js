const { getComponent } = require('./utils');

module.exports = function(route) {
  return function({ params, state }) {
    const component = getComponent(params, state);
    return this.render(route.view, { component });
  };
};
