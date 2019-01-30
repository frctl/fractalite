const { Adapter } = require('@fractalite/core');
const nunjucksEnv = require('./env');

const defaults = {
  view: ['view.njk', '{name}.view.njk']
};

class NunjucksAdapter extends Adapter {
  constructor(opts = {}) {
    super(Object.assign({}, defaults, opts));
    this.views = [];
    this.env = nunjucksEnv(this.views, opts);
  }

  renderString(str, props, ctx) {
    this.env.api = ctx.api; // For use in extensions/filters etc

    /*
     * Empty views array and then replace with
     * updated set of view tempates.
     */
    this.views.length = 0;
    ctx.api.getComponents().forEach(component => {
      this.views.push({
        name: component.name,
        getContents: () => this.getSourceString(component)
      });
    });

    /*
     * Get the source template string contents and
     * render it asynchronously.
     */
    return new Promise((resolve, reject) => {
      try {
        this.env.renderString(str, props, (err, result) => {
          return err ? reject(err) : resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async renderComponent(component, props, ctx) {
    const tpl = await this.getSourceString(component);
    if (!tpl) {
      throw new Error(`No view template found for component '${component.name}'`);
    }
    return this.renderString(tpl, props, ctx);
  }
}

module.exports = NunjucksAdapter;
