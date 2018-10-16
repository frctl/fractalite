module.exports = function uiAssetRefs(opts, ui) {
  return function(components) {
    return Promise.all(
      components.map(component => {
        const { view } = component;
        if (view) {
          view.contents = ui.utils.resolveUrlRefs(view.contents, component);
        }
        return component;
      })
    );
  };
};
