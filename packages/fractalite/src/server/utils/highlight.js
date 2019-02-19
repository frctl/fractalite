const hljs = require('highlight.js');
const escape = require('escape-html');

module.exports = function() {
  return function highlightCode(str, lang = 'html') {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const h = hljs.highlight(lang, str, true);
        return `<pre><code class="hljs ${lang}">${h.value}</code></pre>`;
      } catch (err) {}
    }
    return `<pre><code class="hljs">${escape(str)}</code></pre>`;
  };
};
