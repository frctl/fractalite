const components = require('./components');
const variants = require('./variants');

module.exports = function(state) {
  return [...components(state), ...variants(state)];
};
