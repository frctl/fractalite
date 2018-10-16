const { mapValues, pick } = require('lodash');
const { toArray } = require('@fractalite/support/utils');
const Router = require('./router');
const Engine = require('./engine');
const Assets = require('./assets');
const resolveConfig = require('./config');
const UIError = require('./error');

module.exports = function(app, opts = {}) {
  const config = resolveConfig(opts);
  const env = {};
  const state = app.getState();
  const ui = { app, config, env, state };

  /*
   * Initialise the rendering engine.
   *
   * Wrap filters and helpers and initialise extensions to
   * provide access to the `ui` object within them.
   */

  const engineConfig = config.engine;

  engineConfig.filters = mapValues(engineConfig.filters, filter => {
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

  engineConfig.helpers = mapValues(engineConfig.helpers, helper => {
    return function(...args) {
      const handler = helper.bind(this);
      return handler(args, ui);
    };
  });

  engineConfig.extensions = mapValues(engineConfig.extensions, Ext => new Ext(ui));

  const engine = new Engine(engineConfig);
  ui.engine = engine;

  /*
   * Initialise the static assets handler.
   *
   * src values of `.` are replaced with the path to the component source.
   */

  config.assets = config.assets.map(source => {
    source.src = source.src === '.' ? app.get('src.path') : source.src;
    return source;
  });
  ui.assets = new Assets(config.assets);

  /*
   * Initialise the router.
   *
   * Handlers are wrapped to provide access to the UI object
   * and are bound to an set of render helpers that automate
   * adding of context and request variables to the template.
   */

  function handlerCtx(props) {
    return {
      render(path, context, opts) {
        const ctx = Object.assign({}, props, context);
        return engine.render(path, ctx, opts);
      },
      renderString(path, context) {
        const ctx = Object.assign({}, props, context);
        return engine.renderString(path, ctx);
      },
      throw(msg, status) {
        throw new UIError(msg, status);
      }
    };
  }

  config.routes = config.routes.map(route => {
    route.ctx = Object.assign({ app, config, env, state }, route.ctx || {});
    return route;
  });

  ui.router = new Router(config.routes, handlerCtx);

  /*
   * Attach any theme-specific plugins
   */

  for (const pluginDef of config.parser.plugins) {
    const [attacher, opts = {}] = toArray(pluginDef);
    app.use(attacher, opts, ui);
  }

  /*
   * Resolve the styleheet and script paths to expand
   * `source:target.css` format paths to proper URLs.
   */

  env.stylesheets = config.stylesheets.map(ref => ui.assets.getMountedPath(ref));
  env.scripts = config.scripts.map(ref => ui.assets.getMountedPath(ref));

  /*
   * Give templates access to environment and state data.
   */

  engine.setGlobal('ui', ui.env);
  engine.setGlobal('state', ui.state);

  return ui;
};
