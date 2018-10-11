const path = require('path');
const _ = require('lodash');
const slug = require('slugify');
const titlecase = require('titlecase');
const slash = require('slash');
// Const {assert} = require('check-types');

const utils = {
  addTrailingSeparator(str) {
    return path.join(str, path.sep);
  },

  removeTrailingSeparator(str) {
    while (utils.endsInSeparator(str)) {
      str = str.slice(0, -1);
    }
    return str;
  },

  endsInSeparator(str) {
    const last = str[str.length - 1];
    return str.length > 1 && (last === '/' || (utils.isWin() && last === '\\'));
  },

  normalizePath(filePath, cwd) {
    // Assert.string(filePath, `Path must be a string. Received '${typeof filePath}' [paths-invalid]`);
    cwd = cwd || process.cwd();
    if (!path.isAbsolute(filePath)) {
      filePath = path.join(cwd, filePath);
    }
    filePath = utils.removeTrailingSeparator(filePath);
    return path.normalize(filePath);
  },

  normalizePaths(paths, cwd) {
    paths = utils.toArray(paths);
    return paths.map(filePath => utils.normalizePath(filePath, cwd));
  },

  normalizeName(str) {
    return _.kebabCase(str.toLowerCase().replace(/^[^a-z]*/, ''));
  },

  normalizeExt(ext) {
    return `.${ext.toLowerCase().replace(/^\./, '')}`;
  },

  permalinkify(str, opts = {}) {
    const indexes = opts.indexes || false;
    let permalink = _.trim(slash(str), '/');
    if (opts.ext !== false) {
      const fallbackExt = utils.normalizeExt(opts.ext || '.html');
      permalink = permalink === '' ? 'index' + fallbackExt : permalink;
      if (!path.extname(permalink)) {
        permalink += (indexes && !/\/?index$/.test(permalink) ? '/index' : '') + fallbackExt;
      }
    }
    if (opts.prefix) {
      permalink = _.trim(opts.prefix, '/') + '/' + permalink;
    }
    return '/' + permalink;
  },

  slugify(str, replacement) {
    return slug(str.toLowerCase(), replacement || '-');
  },

  titlize(str) {
    return titlecase(str.replace(/[-_]/g, ' '));
  },

  isWin() {
    return process.platform === 'win32';
  },

  defaultsDeep(...args) {
    const output = {};
    let customizer;
    args = _.compact(args);
    if (typeof args[args.length - 1] === 'function') {
      const fn = args.pop();
      customizer = (defaultValue, targetValue, ...other) => fn(targetValue, defaultValue, ...other);
    } else {
      customizer = (defaultValue, targetValue) => {
        if (Array.isArray(targetValue)) {
          // Don't merge arrays - the target array overrides the default value
          return targetValue;
        }
        if (_.isFunction(defaultValue) && _.isObject(targetValue)) {
          return targetValue;
        }
      };
    }
    const items = args.reverse().map(item => _.cloneDeep(item));
    items.forEach(item => _.mergeWith(output, item, customizer));
    return output;
  },

  toArray(args) {
    if (args === null || args === undefined) {
      return [];
    }
    return [].concat(args);
  }
};

module.exports = utils;
