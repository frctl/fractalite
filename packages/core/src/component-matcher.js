module.exports = function(dir, children, opts = {}) {
  if (children.length === 0) {
    return false; // Components cannot be empty directories
  }
  const matchFiles = opts.matchFiles || ['package.json', 'view.', 'config.'];
  for (const file of children) {
    // Check to see if any of the files within the directory
    // match any of the key component file names.
    for (const matcher of matchFiles) {
      if (file.basename.indexOf(matcher) > -1) {
        return true;
      }
    }
  }
  return false;
};
