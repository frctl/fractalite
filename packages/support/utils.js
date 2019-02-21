const path = require('path');
const _ = require('lodash');
const slug = require('slugify');
const titlecase = require('titlecase');
const slash = require('slash');

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

  assign(target, ...sources) {
    sources.forEach(source => {
      const descriptors = Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
      }, {});
      // By default, Object.assign copies enumerable Symbols too
      Object.getOwnPropertySymbols(source).forEach(sym => {
        const descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor;
        }
      });
      Object.defineProperties(target, descriptors);
    });
    return target;
  },

  toArray(args) {
    if (args === null || args === undefined) {
      return [];
    }
    return [].concat(args);
  },

  resolveValue(value, ctx) {
    return Promise.resolve(_.isFunction(value) ? value(ctx) : value);
  },

  async mapValuesAsync(obj, asyncFn) {
    const keys = Object.keys(obj);
    const promises = keys.map(async key => {
      return { key, value: await asyncFn(obj[key]) };
    });
    const values = await Promise.all(promises);
    const newObj = {};
    values.forEach(v => {
      newObj[v.key] = v.value;
    });
    return newObj;
  },

  normalizeSrc(src, defaults = {}) {
    if (_.isString(src) || Array.isArray(src)) {
      src = {
        paths: utils.toArray(src)
      };
    }
    src = utils.defaultsDeep(src, defaults, { opts: {} });
    src.paths = utils.normalizePaths(src.paths);
    return src;
  },

  processStack(...args) {
    const mapper = _.isFunction(args[args.length - 1]) ? args.pop() : null;
    const values = _.compact(_.flatten(args));
    let result = [];
    let final = [];
    for (const value of values) {
      if (!value) {
        continue;
      }
      if (Array.isArray(value) || _.isString(value)) {
        result = result.concat(value);
      } else if (_.isPlainObject(value)) {
        const replace = [].concat(_.get(value, 'replace', result));
        const prepend = [].concat(_.get(value, 'prepend', []));
        const append = [].concat(_.get(value, 'append', []));
        if (value.final) {
          final = final.concat(value.final);
        }
        result = prepend.concat(replace).concat(append);
      }
    }
    result = [...result, ...final];
    return mapper ? result.map(mapper) : result;
  }
};

module.exports = utils;
