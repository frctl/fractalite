const { SafeString } = require('nunjucks').runtime;

module.exports = async function markdown(str, args, { engine }) {
  const html = await engine.renderMarkdownString(str);
  return new SafeString(html);
};

module.exports.async = true;
