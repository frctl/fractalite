const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const Markdown = require('markdown-it');

module.exports = function(opts = {}) {
  const md = new Markdown(
    defaultsDeep(opts, {
      html: true,
      linkify: true,
      highlight: opts.highlight
    })
  );

  function renderMarkdown(str) {
    return md.render(str);
  }

  renderMarkdown.engine = md;

  return renderMarkdown;
};
