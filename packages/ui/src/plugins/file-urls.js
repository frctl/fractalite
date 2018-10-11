module.exports = function(opts, app, ui) {
  return function(components) {
    return Promise.all(
      components.map(component => {
        component.files = component.files.map(file => {
          const url = file.url || ui.assets.getMountedPath(file.path, 'src');
          file.url = ui.utils.url(url);
          return file;
        });
        return component;
      })
    );
  };
};
