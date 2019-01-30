const { isString, isPlainObject, get, flatten, compact } = require('lodash');
const attributes = require('html-url-attributes');
const Collection = require('./collection');
const { toArray, defaultsDeep, normalizePaths } = require('./utils');

const urlAttrs = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `(${Object.keys(attributes).join('|')})\=([\"\'])([^\"\']*)([\"\'])`,
  'gi'
);

const helpers = {
  collect(items, deep = false) {
    return deep ? helpers.deepCollect(items) : new Collection(items);
  },

  deepCollect(items) {
    if (Collection.isCollection(items)) {
      return items;
    }
    const collection = new Collection(items);
    for (const item of collection) {
      for (const propName of Object.keys(item)) {
        if (Array.isArray(item[propName])) {
          item[propName] = helpers.deepCollect(item[propName]);
        }
      }
    }
    return collection;
  },

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

  stack(...args) {
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
  }

  // MatchFile(files, matcher, props = {}) {
  //   matcher = [].concat(matcher).map(match => pupa(match, props));
  //   return files.find(f => {
  //     return multimatch(f.path, matcher, { matchBase: true }).length;
  //   });
  // },

  // parseHandle(handle) {
  //   const [component, ...parts] = handle.replace(/^@/, '').split('/');
  //   const rest = parts.join('/');
  //   let variant = null;
  //   let path = null;
  //   if (extname(rest)) {
  //     path = rest;
  //   } else {
  //     variant = rest;
  //   }
  //   return { component, path, variant };
  // },
};

module.exports = helpers;
