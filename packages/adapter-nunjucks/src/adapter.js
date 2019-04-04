const nunjucksEnv = require('./env');

module.exports = function(compiler, opts = {}) {
  const env = nunjucksEnv(opts);
  const { views } = env.loader;
  env.state = compiler.getState(); // For use in extensions/filters etc

  compiler.on('finish', state => {
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
          const view = component.matchFiles(opts.views)[0];
          return view ? view.getContents() : null;
        }
      });
      // Lookup component-relative file by `./filename.ext` path
      component.files.forEach(file => {
        views.push({
          name: `./${file.componentPath}`,
          getContents: () => file.getContents()
        });
      });
    });
  });

  async function render(component, props, state) {
    return new Promise((resolve, reject) => {
      env.render(component.name, props, (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  async function getTemplateString(component) {
    const view = component.matchFiles(opts.views)[0];
    return view ? view.getContents() : null;
  }

  return { render, getTemplateString };
};
