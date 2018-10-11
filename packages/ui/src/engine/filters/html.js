module.exports = async function html(target, args, ui) {
  let html = await ui.app.render(target, ...args);
  html = ui.utils.resolveUrlRefs(html);
  return html;
};

module.exports.async = true;
