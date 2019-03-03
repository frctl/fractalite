const { flatMap } = require('lodash');

module.exports = function(app, compiler, renderer, opts = {}) {
  app.addRoute('api.search', '/api/search.json', ctx => {
    const components = flatMap(ctx.components, component => {
      const searchOpts = component.config.search || {};
      if (searchOpts.hidden) {
        return;
      }
      return {
        label: component.label,
        url: component.url,
        aliases: searchOpts.aliases || [],
        scenarios: component.scenarios.map(scenario => {
          return {
            label: scenario.label,
            url: scenario.url
          };
        })
      };
    }).filter(component => component);
    ctx.body = { opts, components };
  });

  app.addBuilder((state, { request }) => request({ name: 'api.search' }));
};
