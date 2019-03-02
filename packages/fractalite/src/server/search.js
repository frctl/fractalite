const { get, set, isString, isPlainObject, key } = require('lodash');
const isArray = Array.isArray;

const defaultOpts = {
  keys: [
    {
      name: 'label'
    },
    'scenarios.name'
  ]
};

module.exports = function(app, compiler, renderer, opts = {}) {
  opts = { ...defaultOpts, ...opts };

  app.addRoute('api.search', '/api/search.json', ctx => {
    const items = ctx.components.map(component => {
      const props = {};
      opts.keys.forEach(key => {
        let path;
        if (isString(key)) {
          path = key;
        } else if (isPlainObject(key) && isString(key.name)) {
          path = key.name;
        }
        if (!path) {
          throw new Error('Invalid search key');
        }
        let value = get(component, path);
        if (typeof value === 'undefined') {
          value = deepValue(component, path);
        }
        set(props, path, value);
      });
      return {
        label: component.label,
        url: component.url,
        props
      };
    });
    ctx.body = { opts, items };
  });
};

/// extracted from the fuse search helpers: https://github.com/krisk/Fuse/blob/master/src/helpers/deep_value.js
function deepValue(obj, path, list = []) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    const dotIndex = path.indexOf('.');
    let firstSegment = path;
    let remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    const value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value.toString());
      } else if (isArray(value)) {
        // Search each item in the array.
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
}
