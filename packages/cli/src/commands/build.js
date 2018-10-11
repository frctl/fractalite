/* eslint-disable unicorn/no-process-exit */

const { cyan } = require('kleur');
const webUI = require('@fractalite/ui');
const Logger = require('../logger');

module.exports = function build(opts = {}) {
  return async function(args, config, { logger, exit }) {
    const interactiveLogger = new Logger({ interactive: true });
    interactiveLogger.await('Starting static UI build...');

    const { builder, ui } = await webUI.build(config);

    interactiveLogger.success(
      `Static UI build complete (${builder.stats.pages.length} pages built, ${
        builder.stats.files.length
      } files copied)`
    );

    if (args.serve) {
      const server = new webUI.Server({
        port: args.port || ui.config.build.server.port,
        assets: [{ src: ui.config.build.dest }]
      });
      await server.start();

      logger.success('Serving build directory');

      logger.log(`
        ---
        Local:   ${cyan(`http://${server.hostname}:${server.port}`)}
        Network: ${cyan(`http://${server.address}:${server.port}`)}
        ---
      `);

      process.on('SIGINT', () => {
        server.stop();
        logger.br.success('Build directory server stopped');
        exit();
      });
    } else {
      exit();
    }
  };
};
