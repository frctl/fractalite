const Fractal = require('@fractalite/core');

module.exports = function list() {
  return async function(args, config, { logger }) {
    const app = new Fractal(config);
    const { components } = await app.init();
    logger.br().log(`${components.length} components found:`);
    logger.br();
    for (const component of components) {
      logger.log(`-- ${component.label} (${component.root.relative})`);
    }
  };
};

module.exports.description = 'List all components';
