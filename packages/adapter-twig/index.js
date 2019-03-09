const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const createAdapter = require('./src/adapter');

const defaults = {
  views: ['view.twig', '{name}.view.twig', 'view.twig.html', '{name}.view.twig.html']
};

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, defaults);
  const adapter = createAdapter(opts);

  return function nunjucksAdapter(app, compiler) {
    // Compiler middleware to identify .twig files as HTML fragments so that
    // further pre-processing of templates can take place later if required.
    compiler.use(components => {
      components.forEach(component => {
        const nunjucksFiles = component.matchFiles(['*.twig']);
        nunjucksFiles.forEach(file => {
          file.isHTMLFragment = true;
        });
      });
    });

    return adapter;
  };
};
