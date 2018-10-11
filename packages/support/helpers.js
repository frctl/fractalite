const { extname } = require('path');

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
  }
};

module.exports = helpers;
