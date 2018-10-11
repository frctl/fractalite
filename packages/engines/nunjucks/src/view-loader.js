const { Loader } = require('nunjucks');

module.exports = Loader.extend({
  views: [],
  getSource(lookup) {
    const name = lookup.replace(/^@/, '');
    const view = this.views.find(view => view.name === name);
    if (view) {
      return {
        src: view.contents,
        path: lookup,
        noCache: true
      };
    }
  }
});
