const { isString, isPlainObject, get, flatten, compact } = require('lodash');
const attributes = require('html-url-attributes');
const pupa = require('pupa');
const multimatch = require('multimatch');
const { toArray, defaultsDeep, normalizePaths } = require('./utils');

const urlAttrs = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `(${Object.keys(attributes).join('|')})\=([\"\'])([^\"\']*)([\"\'])`,
  'gi'
);

const helpers = {
  normalizeSrc(src, defaults = {}) {
    if (isString(src) || Array.isArray(src)) {
      src = {
        paths: toArray(src)
      };
    }
    src = defaultsDeep(src, defaults, { opts: {} });
    src.paths = normalizePaths(src.paths);
    return src;
  },

  resolveStack(...args) {
    const values = compact(flatten(args));
    let result = [];
    for (const value of values) {
      if (!value) {
        continue;
      }
      if (Array.isArray(value) || isString(value)) {
        result = result.concat(value);
      } else if (isPlainObject(value)) {
        const replace = [].concat(get(value, 'replace', result));
        const prepend = [].concat(get(value, 'prepend', []));
        const append = [].concat(get(value, 'append', []));
        result = prepend.concat(replace).concat(append);
      }
    }
    return result;
  },

  rewriteUrls(str, replacer) {
    return str.replace(urlAttrs, (...args) => {
      const [matched, attr, quoteOpen, path, quoteClose] = args;
      const newPath = replacer(path, { attr, matched, quoteOpen, quoteClose });
      if (newPath) {
        return `${attr}=${quoteOpen}${newPath}${quoteClose}`;
      }
      return matched;
    });
  },

  resolveFileUrl(url, localFiles, allFiles = [], assets = []) {
    if (url.startsWith('./')) {
      return localFiles.find(f => f.relative === url.replace(/^\.\//, ''));
    }
    if (url.startsWith('@')) {
      return allFiles.find(f => f.handle === url.replace(/^@/, ''));
    }
    return assets.find(a => a.handle === url);
  },

  match(items, prop, matcher, replacements = {}) {
    matcher = [].concat(matcher).map(match => pupa(match, replacements));
    return items.filter(item => {
      return multimatch(item[prop], matcher).length;
    });
  },

  matchOne(...args) {
    const matches = helpers.match(...args);
    return matches.length > 0 ? matches[0] : null;
  }
};

module.exports = helpers;
