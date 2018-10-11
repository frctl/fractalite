const { mapValues } = require('lodash');
const Fractal = require('@fractalite/core');
const { toArray } = require('@fractalite/support/utils');
const Router = require('./router');
const Engine = require('./engine');
const Assets = require('./assets');
const resolveConfig = require('./config');

module.exports = function(conf = {}) {
  const app = new Fractal(conf);
  const config = resolveConfig(conf.ui);
  const engineConfig = config.engine;
  const engine = new Engine(engineConfig);

  const ui = { app, config, engine };

  config.assets = config.assets.map(source => {
    source.src = source.src === '.' ? app.get('src.path') : source.src;
    return source;
  });

  ui.assets = new Assets(config.assets);

  ui.router = new Router(config.routes);
  ui.router.decorate(route => {
    const { handler } = route;
    route.handler = ({ url, params, error }) => {
      const request = { url, route, params };
      engine.setGlobal('error', error);
      engine.setGlobal('request', request);
      return handler(Object.assign({ request, params, error }, ui));
    };
    return route;
  });

  const filters = mapValues(engineConfig.filters, filter => {
    const wrapped = function(...args) {
      const input = args.shift();
      if (filter.async === true) {
        const done = args.pop();
        filter(input, args, ui)
          .then(result => done(null, result))
          .catch(err => done(err));
      } else {
        return filter(input, args, ui);
      }
    };
    wrapped.async = Boolean(filter.async);
    return wrapped;
  });

  const helpers = mapValues(engineConfig.helpers, helper => {
    return function(...args) {
      const handler = helper.bind(this);
      return handler(args, ui);
    };
  });

  const extensions = mapValues(engineConfig.extensions, extension => {
    Object.defineProperty(extension, 'ui', {
      value: ui,
      writable: false
    });
    return extension;
  });

  for (const pluginDef of config.parser.plugins) {
    const [attacher, opts = {}] = toArray(pluginDef);
    app.use(attacher, opts, ui);
  }

  ui.state = app.getState();

  engine.setGlobal('state', ui.state);
  engine.addFilters(filters);
  engine.addHelpers(helpers);
  engine.addExtensions(extensions);

  return ui;
};
