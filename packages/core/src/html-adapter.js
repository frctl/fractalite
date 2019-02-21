const pupa = require('pupa');

module.exports = function(app, compiler) {
  const views = ['view.html', '{name}.view.html'];

  compiler.use(components => {
    components.forEach(component => {
      const fragments = component.matchFiles(views);
      fragments.forEach(file => {
        file.isHTMLFragment = true;
      });
    });
  });

  return {
    views,
    async render(component, props, state) {
      const view = component.matchFiles(views)[0];
      if (view) {
        return pupa(await view.getContents(), props);
      }
      throw new Error(`Could not render component - no view file found`);
    }
  };
};
