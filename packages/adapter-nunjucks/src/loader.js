const { Loader } = require('nunjucks');

module.exports = Loader.extend({
  views: [],
  async: true,
  async getSource(lookup, callback) {
    const name = lookup.replace(/^@/, '');
    const view = this.views.find(view => view.name === name);
    if (view) {
      try {
        const contents = await view.getContents();
        return callback(null, {
          src: contents,
          path: lookup,
          noCache: true
        });
      } catch (err) {
        return callback(err);
      }
    }
    callback(new Error(`Nunjucks adapter: Template '${lookup}' not found`));
  }
});
