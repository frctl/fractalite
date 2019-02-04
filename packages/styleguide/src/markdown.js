const { defaultsDeep } = require('@fractalite/support/utils');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
const escape = require('escape-html');

module.exports = function(opts = {}) {
  return function markdownPlugin(app) {
    opts = defaultsDeep(opts, {
      html: true,
      linkify: true,
      highlight: app.utils.highlightCode
    });

    const md = new Markdown(opts);

    Object.defineProperty(app, 'utils.markdown', {
      value: md,
      writable: false
    });

    app.utils.renderMarkdown = str => md.render(str);

    app.addViewFilter('markdown', str => md.render(str || ''));
  };
};
