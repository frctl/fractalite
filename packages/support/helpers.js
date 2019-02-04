const { dirname } = require('path');
const { isString, isPlainObject, get, flatten, compact, flatMap, uniqBy } = require('lodash');
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

  toTree(items, pathProp) {
    let nodes = flatMap(items, item => {
      const path = item.treePath || item[pathProp] || '';
      const nodes = makeNodes(path.trim('/'));
      nodes[nodes.length - 1].node = item;
      return nodes;
    });

    nodes = uniqBy(nodes, 'path');

    return nodes.filter(node => node.depth === 1).map(node => {
      node.children = getChildren(node, nodes);
      return node;
    });

    function getChildren(parent, nodes) {
      const children = nodes.filter(node => {
        return node.depth === parent.depth + 1 && dirname(node.path) === parent.path;
      });
      for (const child of children) {
        child.children = getChildren(child, nodes);
      }
      return children;
    }

    function makeNodes(path = '') {
      const nodes = [];
      let tmpPath;
      const segments = [];
      for (const segment of path.split('/')) {
        tmpPath = tmpPath ? `${tmpPath}/${segment}` : segment;
        segments.push(segment);
        nodes.push({
          name: segment,
          path: tmpPath,
          depth: segments.length
        });
      }
      return nodes;
    }
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
