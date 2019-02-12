const pupa = require('pupa');

module.exports = function(app, config) {
  const views = ['view.html', '{name}.view.html'];
  return {
    views,
    async renderComponent(component, props, state) {
      const view = component.matchFile(views);
      if (view) {
        return pupa(await view.getContents(), props);
      }
      throw new Error(`Could not render component - no view file found`);
    }
  };
};
