const { parse, dirname, relative } = require('path');
const globby = require('globby');
const globBase = require('glob-base');
const { stat } = require('fs-extra');
const { normalizeName } = require('@fractalite/support/utils');

module.exports = async function(path, opts = {}) {
  const paths = await globby([path, '!**/node_modules'], {
    onlyFiles: false,
    gitignore: !(opts.gitignore === false)
  });
  const glob = globBase(path);
  const root = glob.isGlob ? glob.base : path;
  return Promise.all(
    paths.map(async p => {
      const { ext, base, name } = parse(p);
      const stats = await stat(p);
      return {
        relative: relative(root, p),
        path: p,
        basename: base,
        dirname: dirname(p),
        extname: ext,
        ext: ext.toLowerCase(),
        stem: name,
        stats,
        name: normalizeName(name)
      };
    })
  );
};
