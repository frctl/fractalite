const Server = require('./src/server');
const DevServer = require('./src/dev-server');
const Builder = require('./src/builder');
const init = require('./src/ui');
const utils = require('./src/env-utils');

module.exports.develop = async function(app, opts = {}) {
  const ui = init(app, opts);
  const { config, env } = ui;

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

  await app.init();
  await server.start();

  ui.env.port = server.port;
  ui.env.hostname = server.hostname;
  ui.env.address = server.address;

  server.on('connection', ({ socket }) => socket.emit('state', app.getState()));

  app.watch(state => server.emit('state_updated', state));
  app.on('error', err => server.emit('error', err));

  await ui.assets.watch(path => {
    server.emit('asset_updated', ui.utils.url(path));
  });

  return { server, ui, app };
};

module.exports.build = async function(app, opts = {}) {
  const ui = init(app, Object.assign({ cache: false }, opts.ui));
  const { config, env } = ui;
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

  const builder = new Builder(buildConfig);
  await app.init();
  await builder.run(ui.assets, ui.router, app.getState());
  return { builder, ui, app };
};

module.exports.Server = Server;
