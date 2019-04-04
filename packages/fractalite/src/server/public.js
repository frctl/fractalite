module.exports = function(app, compiler, adapter, opts = {}) {
  if (typeof opts === 'string') {
    opts = {
      path: opts
    };
  }

  if (opts.path) {
    app.addStaticDir('public', opts.path, opts.mount);
  }
};
