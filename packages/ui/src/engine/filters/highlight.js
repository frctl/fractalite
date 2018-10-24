const beautify = require('js-beautify');
const hljs = require('highlight.js');
const { SafeString } = require('nunjucks').runtime;

module.exports = function highlight(code, [lang]) {
  code = String(code);
  const output = lang ? hljs.highlight(lang, code) : hljs.highlightAuto(code);
  return new SafeString(`<pre><code class="hljs ${output.language}">${output.value}</code></pre>`);
};
