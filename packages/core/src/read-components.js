const { orderBy, difference, compact, clone } = require('lodash');
const { addTrailingSeparator } = require('@frctl/fractalite-support/utils');
const read = require('./read');
const Component = require('./entities/component');

module.exports = async function(src, opts = {}) {
  let files = await read(src, opts);

  files = orderBy(files, 'path.length', 'desc');
  const dirs = files.filter(f => f.stats.isDirectory());
  let unusedFiles = files.filter(f => f.stats.isFile());

  const components = dirs.map(dir => {
    if (dir.stem[0] !== '@') {
      return undefined; // Not a component
    }

    const rootPath = addTrailingSeparator(dir.path);
    const children = unusedFiles.filter(f => f.path.startsWith(rootPath));

    if (children.length === 0) {
      return null;
    }

    unusedFiles = difference(unusedFiles, children); // Remove files from future consideration

    return new Component({
      name: dir.name,
      path: dir.path,
      relative: dir.relative,
      root: clone(dir),
      scenarios: [],
      files: children.map(clone)
    });
  });

  return compact(components);
};
