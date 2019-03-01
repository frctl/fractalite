const { orderBy, difference, compact, clone } = require('lodash');
const read = require('./read');
const Component = require('./entities/component');

module.exports = async function(src, opts = {}) {
  let files = await read(src, opts);

  files = orderBy(files, 'path.length', 'desc');
  const dirs = files.filter(f => f.stats.isDirectory());
  let unusedFiles = files.filter(f => f.stats.isFile());

  const matcher = opts.matcher || defaultComponentMatcher;

  const components = dirs.map(dir => {
    const children = unusedFiles.filter(f => f.path.startsWith(`${dir.path}/`));

    if (!matcher(dir, children)) {
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

function defaultComponentMatcher(dir, children) {
  return dir.stem[0] === '@' && children.length > 0;
}
