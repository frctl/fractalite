const { get, pick } = require('lodash');
const loadConfig = require('./src/load-config');
const Compiler = require('./src/compiler');
const Adapter = require('./src/adapter');
const coreMiddleware = require('./src/middleware');

function init(config = {}) {
  const compiler = Compiler(config);

  coreMiddleware.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    compiler.use(handler(opts));
  });

  return compiler;
}

function fromConfig(config) {
  const compiler = init(pick(config, ['components', 'assets']));
  const adapter = config.adapter instanceof Adapter ? config.adapter : new Adapter(config.adapter);
  return { adapter, compiler };
}

async function fromConfigFile(opts) {
  const configFile = await loadConfig(opts);
  const { config } = configFile;
  const { adapter, compiler } = fromConfig(config);
  return { adapter, compiler, ...configFile };
}

module.exports = init;
module.exports.Fractal = init;
module.exports.fromConfig = fromConfig;
module.exports.fromConfigFile = fromConfigFile;
module.exports.Compiler = Compiler;
module.exports.Adapter = Adapter;
module.exports.Api = require('./src/api');
module.exports.File = require('./src/entities/file');
module.exports.Asset = require('./src/entities/asset');
module.exports.Component = require('./src/entities/component');
module.exports.Variant = require('./src/entities/variant');
module.exports.Entity = require('./src/entities/entity');
module.exports.middleware = coreMiddleware;
module.exports.read = require('./src/read');
