const { SafeString } = require('nunjucks').runtime;
const html = require('./html');

module.exports = async function render(...args) {
  return new SafeString(await html(...args));
};

module.exports.async = true;
