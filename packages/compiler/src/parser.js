const { parse, dirname, relative } = require('path');
const { flatten } = require('lodash');
const globby = require('globby');
const globBase = require('glob-base');
const { stat } = require('fs-extra');
const slash = require('slash');
const { normalizeName, toArray } = require('@fractalite/support/utils');

class Parser {
  constructor(src = [], opts = {}) {
    this._src = toArray(src);
    this._opts = opts;
  }

  async run() {
    return flatten(
      await Promise.all(
        this._src.map(async src => {
          const glob = globBase(src);
          const root = slash(glob.isGlob ? glob.base : src);
          const paths = await globby([src, '!**/node_modules'], {
            onlyFiles: false,
            gitignore: !(this._opts.gitignore === false)
          });
          return Promise.all(paths.map(path => Parser.file(path, root)));
        })
      )
    );
  }
}

Parser.file = async function(path, root) {
  path = slash(path);
  const { ext, base, name } = parse(path);
  const stats = await stat(path);
  return {
    relative: relative(root, path),
    path: path,
    basename: base,
    dirname: dirname(path),
    extname: ext,
    ext: ext.toLowerCase(),
    stem: name,
    stats,
    name: normalizeName(name)
  };
};

module.exports = Parser;
