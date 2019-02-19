const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const nunjucksEnv = require('./env');

const defaults = {
  views: ['view.njk', '{name}.view.njk']
};

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, defaults);

  return {
    views: opts.views,

    async render(component, props, state) {
      const view = component.matchFile(opts.views);
      if (view === null) {
        throw new Error(`Nunjucks adapter: No view found for component '${component.name}'`);
      }
      const str = await view.getContents();
      const env = nunjucksEnv(opts);

      const { views } = env.loader;
      env.state = state; // For use in extensions/filters etc

      /*
       * Empty views array and then replace with
       * updated set of view tempates.
       */
      views.length = 0;
      state.components.forEach(component => {
        // Lookup view by handle: {% include 'button' %}
        views.push({
          name: component.name,
          getContents: () => {
            const view = component.matchFile(opts.views);
            return view ? view.getContents() : null;
          }
        });
        // Lookup file by handle
        state.files.forEach(file => {
          views.push({
            name: file.handle,
            getContents: () => file.getContents()
          });
        });
        // Lookup component-relative file by `./filename.ext` path
        component.files.forEach(file => {
          views.push({
            name: `./${file.relative}`,
            getContents: () => file.getContents()
          });
        });
      });

      /*
       * Get the source template string contents and
       * render it asynchronously.
       */
      return new Promise((resolve, reject) => {
        env.renderString(str, props, (err, result) => {
          return err ? reject(err) : resolve(result);
        });
      });
    }
  };
};
