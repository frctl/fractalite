const { get } = require('lodash');
const Compiler = require('./src/compiler');
const coreMiddleware = require('./src/middleware');

function init(config) {
  const compiler = new Compiler(config);

  coreMiddleware.forEach(({ key, handler }) => {
    const opts = get(config, key, {});
    compiler.use(handler(opts));
  });

  return compiler;
}

module.exports = init;
module.exports.createCompiler = init;
module.exports.createRenderer = require('./src/renderer');
module.exports.htmlAdapter = require('./src/html-adapter');
module.exports.File = require('./src/entities/file');
module.exports.Asset = require('./src/entities/asset');
module.exports.Component = require('./src/entities/component');
module.exports.Variant = require('./src/entities/variant');
module.exports.Entity = require('./src/entities/entity');
module.exports.middleware = require('./src/middleware');
module.exports.read = require('./src/read');
module.exports.watch = require('chokidar').watch;
