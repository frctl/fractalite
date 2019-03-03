const { flatMap } = require('lodash');
const isArray = Array.isArray;

const defaultOpts = {
  keys: ['label']
};

module.exports = function(app, compiler, renderer, opts = {}) {
  opts = { ...defaultOpts, ...opts };

  app.addRoute('api.search', '/api/search.json', ctx => {
    const components = flatMap(ctx.components, component => {
      return {
        label: component.label,
        url: component.url,
        scenarios: component.scenarios.map(scenario => {
          return {
            label: scenario.label,
            url: scenario.url
          };
        })
      };
    });
    ctx.body = { opts, components };
  });
};
