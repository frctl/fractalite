const { TwingEnvironment, TwingLoaderArray } = require('twing');

module.exports = function(compiler, opts = {}) {
  const loader = new TwingLoaderArray({});

  compiler.on('finish', state => {
    loader.templates.clear();
    state.components.forEach(component => {
      const view = component.matchFiles(opts.views)[0];
      if (view) {
        const contents = view.getContentsSync();
        loader.setTemplate(component.name, contents);
        loader.setTemplate(view.relative, contents);
      }
    });
  });

  const twing = new TwingEnvironment(loader, {
    cache: opts.cache ? opts.cache : false
  });

  return async function render(component, props, state) {
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
