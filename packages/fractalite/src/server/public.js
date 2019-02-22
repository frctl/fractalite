module.exports = function(app, compiler, renderer, opts = {}) {
  if (typeof opts === 'string') {
    opts = {
      path: opts
    };
  }

  app.addStaticDir('public', opts.path, opts.mount);
};
