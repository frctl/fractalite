const { defaultsDeep } = require('@fractalite/support/utils');
const hljs = require('highlight.js');
const escape = require('escape-html');

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, {});

  return function highlightPlugin(app) {
    app.utils.highlightCode = (str, lang = 'html') => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const h = hljs.highlight(lang, str, true);
          return `<pre class="fr-code"><code class="hljs ${lang}">${h.value}</code></pre>`;
        } catch (err) {}
      }
      return `<pre class="fr-code hljs"><code class="hljs">${escape(str)}</code></pre>`;
    };

    app.addViewFilter('highlight', (str, lang) => app.utils.highlightCode(str, lang));
  };
};
