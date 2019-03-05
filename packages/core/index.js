const { get, isString } = require('lodash');
const { normalizeSrc } = require('@frctl/fractalite-support/utils');
const createCompiler = require('./src/compiler');
const coreMiddleware = require('./src/middleware');

function init(config = {}) {
  if (isString(config)) {
    config = {
      src: config,
      watch: {}
    };
  }

  const normalizedConfig = {
    src: normalizeSrc(config.src || {}),
    watch: normalizeSrc(config.watch || {}),
    opts: config.opts || {}
  };

  const compiler = createCompiler(normalizedConfig);

  coreMiddleware.forEach(({ key, handler }) => {
    const opts = get(normalizedConfig, `opts.${key}`, {});
    compiler.use(handler(opts));
  });

  return compiler;
}

module.exports = init;
module.exports.createCompiler = init;
module.exports.createRenderer = require('./src/renderer');
module.exports.htmlAdapter = require('./src/html-adapter');
module.exports.File = require('./src/entities/file');
module.exports.Component = require('./src/entities/component');
module.exports.Entity = require('./src/entities/entity');
module.exports.middleware = require('./src/middleware');
module.exports.read = require('./src/read');
module.exports.watch = require('chokidar').watch;
