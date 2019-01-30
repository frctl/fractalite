const { merge } = require('lodash');

module.exports = function(opts) {
  const modes = [
    {
      mode: 'develop',
      ext: false,
      hostname: 'localhost',
      port: 3000,
      cache: false
    },
    {
      mode: 'build',
      prefix: null,
      dest: null,
      indexes: true,
      ext: '.html',
      clean: false,
      gitignore: false,
      cache: true
    }
  ];

  opts = typeof opts === 'string' ? { opts } : opts;
  const mode = modes.find(m => m.mode === opts.mode);
  if (!mode) {
    throw new Error(`Invalid mode '${opts.mode}'`);
  }
  return merge(mode, opts, {
    toString() {
      return this.mode;
    }
  });
};
