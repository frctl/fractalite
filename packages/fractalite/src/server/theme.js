const { isString, isFunction, isPlainObject, forEach } = require('lodash');

module.exports = function(app, compiler, renderer, opts = {}) {
  if (isFunction(opts)) {
    opts = opts(app) || {};
  }

  if (isString(opts.css)) {
    app.addCSS(opts.css);
  }

  if (isString(opts.js)) {
    app.addCSS(opts.js);
  }

  if (Array.isArray(opts.stylesheets)) {
    opts.stylesheets.forEach(stylesheet => {
      const { path, url } = app.utils.resolveAsset(stylesheet);
      app.addStylesheet(url, path);
    });
  }

  if (Array.isArray(opts.scripts)) {
    opts.scripts.forEach(script => {
      const { path, url } = app.utils.resolveAsset(script);
      app.addScript(url, path);
    });
  }

  if (isString(opts.views)) {
    app.addViewPath(opts.views);
  }

  if (isPlainObject(opts.vars)) {
    let css = ':root {\n';
    forEach(opts.vars, (val, key) => {
      css += `--${key}: ${val};\n`;
    });
    css += '}';
    app.addCSS(css);
  }
};
