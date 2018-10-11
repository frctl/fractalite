const Server = require('./src/server');
const DevServer = require('./src/dev-server');
const Builder = require('./src/builder');
const init = require('./src/ui');
const utils = require('./src/env-utils');

module.exports.develop = async function(conf = {}) {
  const ui = init(conf);
  const { config, app } = ui;

  ui.env = {
    dev: true,
    urls: {
      indexes: config.develop.indexes,
      ext: config.develop.ext
    }
  };
  ui.utils = utils(ui);

  ui.engine.setGlobal('env', ui.env);

  const server = new DevServer(config.develop);
  server.use(ui.assets).use(ui.router);

  await app.init();
  await server.start();

  ui.env.port = server.port;
  ui.env.hostname = server.hostname;
  ui.env.address = server.address;

  server.on('connection', ({ socket }) => socket.emit('state', app.getState()));

  await app.watch(state => server.emit('state_updated', state));
  await ui.assets.watch(path => {
    server.emit('asset_updated', ui.utils.url(path));
  });

  return { server, ui };
};

module.exports.build = async function(conf = {}) {
  const ui = init(
    Object.assign({}, conf, {
      ui: Object.assign({ cache: false }, conf.ui)
    })
  );
  const { app, config } = ui;
  const buildConfig = config.build;

  ui.env = {
    build: true,
    urls: {
      prefix: buildConfig.prefix,
      indexes: buildConfig.indexes,
      ext: buildConfig.ext
    }
  };
  ui.utils = utils(ui);
  ui.engine.setGlobal('env', ui.env);

  const builder = new Builder(buildConfig);
  await app.init();
  await builder.run(ui.assets, ui.router, app.getState());
  return { builder, ui };
};

module.exports.Server = Server;
