const { readFile } = require('fs-extra');

module.exports = function notes() {
  return function(components) {
    return Promise.all(
      components.map(async component => {
        const readme = component.files.find(file => file.basename.toLowerCase() === 'readme.md');
        if (readme) {
          component.notes = await readFile(readme.path, 'utf-8');
        }
        return component;
      })
    );
  };
};
