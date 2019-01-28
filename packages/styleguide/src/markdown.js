const Markdown = require('markdown-it');

module.exports = function(opts = {}) {
  const md = new Markdown(opts);
  return function markdownPlugin(app) {
    Object.defineProperty(app, 'markdown', {
      value: md,
      writable: false
    });

    app.renderMarkdown = str => md.render(str);

    app.addViewFilter('markdown', str => md.render(str || ''));
  };
};
