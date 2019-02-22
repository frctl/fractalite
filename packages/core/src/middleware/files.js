const { relative } = require('path');
const slash = require('slash');

module.exports = function() {
  return function filesMiddleware(components) {
    components.forEach(component => {
      component.files = component.files.map(file => {
        file.srcRelative = file.relative;
        file.relative = slash(relative(component.root.path, file.path));
        Object.defineProperty(file, 'handle', {
          get() {
            return `${component.name}/${file.relative}`;
          },
          set(value) {
            file._handle = value;
          }
        });
        return file;
      });
    });
  };
};
