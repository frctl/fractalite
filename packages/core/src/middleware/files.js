const { relative } = require('path');
const slash = require('slash');

module.exports = function() {
  return function filesMiddleware(components) {
    components.forEach(component => {
      component.files = component.files.map(file => {
        file.componentPath = slash(relative(component.root.path, file.path));
        Object.defineProperty(file, 'handle', {
          get() {
            return `${component.name}/${file.componentPath}`;
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
