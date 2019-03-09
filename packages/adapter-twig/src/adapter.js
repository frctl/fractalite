const { TwingEnvironment, TwingLoaderArray } = require('twing');

module.exports = function(opts = {}) {
  return async function render(component, props, state) {
    const templates = {};
    state.components.forEach(component => {
      const view = component.matchFiles(opts.views)[0];
      if (view) {
        Object.defineProperty(templates, component.name, {
          get() {
            return view.getContentsSync();
          },
          enumerable: true
        });
      }
    });

    const loader = new TwingLoaderArray(templates);

    const twing = new TwingEnvironment(loader, {
      // cache: '/path/to/compilation_cache'
    });

    return new Promise((resolve, reject) => {
      try {
        const html = twing.render(component.name, props);
        return resolve(html);
      } catch (err) {
        reject(err);
      }
    });
  };
};
