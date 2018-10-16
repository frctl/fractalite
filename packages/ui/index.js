const Server = require('./src/server');
const DevServer = require('./src/dev-server');
const Builder = require('./src/builder');
const init = require('./src/ui');
const utils = require('./src/env-utils');

const logLevels = ['success', 'debug', 'info', 'error', 'warn', 'complete'];

module.exports.develop = async function(app, opts = {}) {
  const ui = await init(app, opts);
  const { config, env, pages } = ui;

  Object.assign(env, {
    dev: true,
    urls: {
      indexes: config.develop.indexes,
      ext: config.develop.ext
    }
  });
  ui.utils = utils(ui);

  const server = new DevServer(config.develop);
  server.use(ui.assets).use(ui.router);

  await server.start();

  ui.env.port = server.port;
  ui.env.hostname = server.hostname;
  ui.env.address = server.address;

  await Promise.all([app.init(), pages.init()]);

  server.on('connection', ({ socket }) => {
    socket.emit('state', [app.getState()]);
  });

  app.watch(state => {
    server.emit('state_updated', app.getState());
    server.emit('log', {
      level: 'success',
      message: 'App state updated'
    });
  });
  ui.assets.watch(path => server.emit('asset_updated', ui.utils.url(path)));
  ui.pages.watch(path => server.emit('state_updated', app.getState()));

  for (const level of logLevels) {
    app.on(`log.${level}`, message => server.emit('log', { level, message }));
  }
  app.on('error', err => {
    server.emit('log', { level: 'error', message: err.message, data: err.stack });
  });

  return { server, ui, app };
};

module.exports.build = async function(app, opts = {}) {
  const ui = init(app, Object.assign({ cache: false }, opts.ui));
  const { config, env, pages } = ui;
  const buildConfig = config.build;

  Object.assign(env, {
    build: true,
    urls: {
      prefix: buildConfig.prefix,
      indexes: buildConfig.indexes,
      ext: buildConfig.ext
    }
  });
  ui.utils = utils(ui);

  await Promise.all([app.init(), pages.init()]);

  const builder = new Builder(buildConfig);
  await builder.run(ui.assets, ui.router, app.getState());
  return { builder, ui, app };
};

module.exports.Server = Server;
