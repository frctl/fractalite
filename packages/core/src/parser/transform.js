const { relative } = require('path');
const slash = require('slash');
const { orderBy, difference, compact, clone } = require('lodash');
const { addTrailingSeparator } = require('@fractalite/support/utils');

module.exports = function transform(files) {
  files = orderBy(files, 'path.length', 'desc');
  const dirs = files.filter(f => f.stats.isDirectory());
  let unusedFiles = files.filter(f => f.stats.isFile());

  const components = dirs.map(dir => {
    if (dir.stem[0] !== '@') {
      return undefined; // Not a component
    }

    const rootPath = addTrailingSeparator(dir.path);
    const children = unusedFiles.filter(f => f.path.startsWith(rootPath));

    unusedFiles = difference(unusedFiles, children); // Remove files from future consideration

    return {
      name: dir.name,
      path: dir.path,
      relative: dir.relative,
      root: clone(dir),
      files: children.map(child => {
        const file = clone(child);
        file.relative = slash(relative(dir.path, file.path));
        return file;
      })
    };
  });

  return compact(components);
};
