const beautify = require('js-beautify');

module.exports = function prettify(code, [lang], { config }) {
  lang = lang || 'html';
  const reformatted = beautify[lang](String(code), config.get('opts.filters.prettify'));
  return reformatted;
};
