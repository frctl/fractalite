const { get, pick } = require('lodash');
const Compiler = require('./src/compiler');
const Adapter = require('./src/adapter');
const Api = require('./src/api');
const coreMiddleware = require('./src/middleware');

function init(config, state = {}) {
  const compiler = new Compiler(pick(config, ['components', 'assets']));

  coreMiddleware.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    compiler.use(handler(opts));
  });

  const adapter = config.adapter instanceof Adapter ? config.adapter : new Adapter(config.adapter);

  for (const mw of adapter.middleware || []) {
    compiler.use(mw);
  }

  const fractal = {};
  const api = new Api(state, adapter);

  fractal.watch = callback => {
    compiler.watch((err, result) => {
      if (err) return callback(err);
      Object.assign(state, result);
      callback(null, api);
    });
    return api;
  };

  fractal.parse = async () => {
    Object.assign(state, await compiler.parse());
    return api;
  };

  return { ...fractal, adapter, compiler };
}

module.exports = init;
module.exports.Fractal = init;
module.exports.loadConfig = require('./src/load-config');
module.exports.Compiler = require('./src/compiler');
module.exports.Adapter = require('./src/adapter');
module.exports.Api = require('./src/api');
module.exports.File = require('./src/entities/file');
module.exports.Asset = require('./src/entities/asset');
module.exports.Component = require('./src/entities/component');
module.exports.Variant = require('./src/entities/variant');
module.exports.Entity = require('./src/entities/entity');
module.exports.middleware = require('./src/middleware');
module.exports.read = require('./src/read');
