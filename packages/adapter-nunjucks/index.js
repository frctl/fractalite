const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const createAdapter = require('./src/adapter');

const defaults = {
  views: ['view.njk', '{name}.view.njk']
};

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, defaults);
  const adapter = createAdapter(opts);

  return function nunjucksAdapter(app, compiler) {
    // Compiler middleware to identify .njk files as HTML fragments so that
    // further pre-processing of templates can take place later if required.
    compiler.use(components => {
      components.forEach(component => {
        const nunjucksFiles = component.matchFiles(['*.njk']);
        nunjucksFiles.forEach(file => {
          file.isHTMLFragment = true;
        });
      });
    });

    return adapter;
  };
};
