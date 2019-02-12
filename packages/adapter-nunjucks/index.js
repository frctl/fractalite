const createAdapter = require('./src/adapter');

module.exports = function(opts = {}) {
  const adapter = createAdapter(opts);
  return function nunjucksAdapter(app, appConfig) {
    return adapter;
  };
};
