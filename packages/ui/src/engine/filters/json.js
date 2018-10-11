const { SafeString } = require('nunjucks').runtime;

module.exports = function json(obj) {
  return new SafeString(JSON.stringify(obj, null, 2));
};
