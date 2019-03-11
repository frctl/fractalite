const { orderBy, difference, compact, clone } = require('lodash');
const Component = require('./entities/component');
const defaultComponentMatcher = require('./component-matcher');

module.exports = async function(files, opts = {}) {
  files = orderBy(files, 'path.length', 'desc'); // Work from deepest to shallowest
  const dirs = files.filter(f => f.stats.isDirectory());
  let unusedFiles = files.filter(f => f.stats.isFile());

  const matcher = opts.matcher || defaultComponentMatcher;

  const components = dirs.map(dir => {
    const children = unusedFiles.filter(f => f.path.startsWith(`${dir.path}/`));

    if (!matcher(dir, children, opts)) {
      return null;
    }

    unusedFiles = difference(unusedFiles, children); // Remove files from future consideration

    return new Component({
      name: dir.name,
      path: dir.path,
      relative: dir.relative,
      root: clone(dir),
      scenarios: [],
      files: children
    });
  });

  return compact(components);
};
