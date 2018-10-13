const { extname } = require('path');
const { isString, isPlainObject, get } = require('lodash');

const helpers = {
  parseHandle(handle) {
    const [component, ...parts] = handle.replace(/^@/, '').split('/');
    const rest = parts.join('/');
    let variant = null;
    let path = null;
    if (extname(rest)) {
      path = rest;
    } else {
      variant = rest;
    }
    return { component, path, variant };
  },

  mergeSrcRefs(values) {
    let refs = [];
    for (const value of values) {
      if (!value) {
        continue;
      }
      if (Array.isArray(value) || isString(value)) {
        refs = refs.concat(value);
      } else if (isPlainObject(value)) {
        const replace = [].concat(get(value, 'replace', refs));
        const prepend = [].concat(get(value, 'prepend', []));
        const append = [].concat(get(value, 'append', []));
        refs = prepend.concat(replace).concat(append);
      }
    }
    return refs;
  }
};

module.exports = helpers;
