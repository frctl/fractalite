const { merge } = require('lodash');

module.exports = function(opts) {
  const modes = [
    {
      mode: 'develop',
      hostname: 'localhost',
      port: 3000,
      cache: false,
      paths: {},
      permalinks: {
        prefix: null,
        indexes: false,
        ext: false
      }
    },
    {
      mode: 'build',
      dest: null,
      clean: false,
      gitignore: false,
      hostname: 'localhost',
      cache: true,
      paths: {},
      permalinks: {
        prefix: null,
        indexes: true,
        ext: '.html'
      }
    }
  ];

  opts = typeof opts === 'string' ? { opts } : opts;
  const mode = modes.find(m => m.mode === opts.mode);
  if (!mode) {
    throw new Error(`Invalid mode '${opts.mode}'`);
  }

  const modeOpts = merge(mode, opts, {
    toString() {
      return this.mode;
    }
  });

  mode.paths = merge({}, mode.permalinks, mode.paths);
  mode.name = mode.mode;

  return modeOpts;
};
