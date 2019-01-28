const NunjucksAdapter = require('./src/adapter');

module.exports = function(opts = {}) {
  return new NunjucksAdapter(opts);
};
