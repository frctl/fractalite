const { SafeString } = require('nunjucks').runtime;

module.exports = async function render(target, args, ui) {
  let html = await ui.app.render(target, ...args);
  html = ui.utils.resolveUrlRefs(html);
  return new SafeString(html);
};

module.exports.async = true;
