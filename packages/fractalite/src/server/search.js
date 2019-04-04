const { flatMap } = require('lodash');

module.exports = function(app, compiler, adapter, opts = {}) {
  app.addRoute('api.search', '/api/search.json', ctx => {
    const components = flatMap(ctx.components, component => {
      const { search } = component;
      if (search.hidden) {
        return;
      }
      return {
        label: component.label,
        url: component.url,
        aliases: search.aliases || [],
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

  compiler.use(components => {
    const defaults = {
      hidden: false,
      aliases: []
    };
    components.forEach(component => {
      const searchOpts = component.config.search || {};
      component.search = { ...defaults, ...searchOpts };
    });
  });

  app.addBuilder((state, { request }) => request({ name: 'api.search' }));
};
