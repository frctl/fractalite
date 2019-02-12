const attributes = require('html-url-attributes');

const urlAttrs = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `(${Object.keys(attributes).join('|')})\=([\"\'])([^\"\']*)([\"\'])`,
  'gi'
);

module.exports = {
  rewriteUrls(str, replacer) {
    return str.replace(urlAttrs, (...args) => {
      const [matched, attr, quoteOpen, path, quoteClose] = args;
      const newPath = replacer(path, { attr, matched, quoteOpen, quoteClose });
      if (newPath) {
        return `${attr}=${quoteOpen}${newPath}${quoteClose}`;
      }
      return matched;
    });
  }
};
