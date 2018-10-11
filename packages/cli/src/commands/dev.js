/* eslint-disable unicorn/no-process-exit */

const { cyan } = require('kleur');
const { develop } = require('@fractalite/ui');

module.exports = function dev(opts = {}) {
  return async function(args, config, { logger, exit }) {
    const { server, app } = await develop(config);

    logger.success('UI server started');

    logger.log(`
      ---
      Local:   ${cyan(`http://${server.hostname}:${server.port}`)}
      Network: ${cyan(`http://${server.address}:${server.port}`)}
      ---
    `);

    app.on('error', err => logger.error(err));

    process.on('SIGINT', () => {
      server.stop();
      logger.br.success('UI server stopped');
      exit();
    });
  };
};

module.exports.description = 'Start the UI development server';
