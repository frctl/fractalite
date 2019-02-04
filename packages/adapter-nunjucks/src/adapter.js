const { Adapter } = require('@fractalite/core');
const nunjucksEnv = require('./env');

const defaults = {
  view: ['view.njk', '{name}.view.njk']
};

class NunjucksAdapter extends Adapter {
  constructor(opts = {}) {
    opts = Object.assign({}, defaults, opts);
    super(opts);
    this.opts = opts;
  }

  renderString(str, props, ctx) {
    const env = nunjucksEnv(this.opts);
    const { views } = env.loader;
    env.api = ctx.api; // For use in extensions/filters etc

    /*
     * Empty views array and then replace with
     * updated set of view tempates.
     */
    views.length = 0;
    ctx.api.getComponents().forEach(component => {
      // Lookup view by handle: {% include 'button' %}
      views.push({
        name: component.handle,
        getContents: () => this.getSourceString(component)
      });
      // Lookup file by handle
      ctx.api.files.forEach(file => {
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

  async renderComponent(component, props, ctx) {
    const tpl = await this.getSourceString(component);
    if (tpl === null) {
      throw new Error(`No view template found for component '${component.name}'`);
    }
    return this.renderString(tpl, props, ctx);
  }
}

module.exports = NunjucksAdapter;
