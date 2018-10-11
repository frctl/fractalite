const pluralize = require('pluralize');

module.exports = function pluralizeFilter(str, args) {
  return pluralize(str, ...args);
};
