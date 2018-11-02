module.exports = function componentUrls(opts, ui) {
  return function(components) {
    return components.map(component => {
      component.variants.forEach(variant => {
        variant.url = ui.router.urlFor('variant', {
          component: component.name,
          variant: variant.name
        });
      });
      return component;
    });
  };
};
