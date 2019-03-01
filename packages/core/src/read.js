const { parse, dirname, relative } = require('path');
const { flatten } = require('lodash');
const globby = require('globby');
const globBase = require('glob-base');
const { stat } = require('fs-extra');
const slash = require('slash');
const { map } = require('asyncro');
const { normalizeName, toArray } = require('@frctl/fractalite-support/utils');
const File = require('./entities/file');

module.exports = async function(src = [], opts = {}) {
  return flatten(
    await map(toArray(src), async src => {
      const glob = globBase(src);
      const root = slash(glob.isGlob ? glob.base : src);
      const paths = await globby([src, '!**/node_modules'], {
        onlyFiles: opts.onlyFiles || false,
        gitignore: opts.gitignore === true
      });
      return map(paths, path => toFile(path, root));
    })
  );
};

async function toFile(path, root) {
  const { ext, base, name } = parse(path);
  const stats = await stat(path);
  path = slash(path);
  return new File({
    root,
    relative: relative(root, path),
    path,
    basename: base,
    dirname: dirname(path),
    extname: ext,
    ext: ext.toLowerCase(),
    stem: name,
    stats,
    name: normalizeName(name)
  });
}
