/* eslint-disable unicorn/no-process-exit */

const { cyan } = require('kleur');
const { Signale } = require('signale');
const Fractal = require('@fractalite/core');

module.exports = function build(opts = {}) {
  const { build, Server } = require('@fractalite/ui');

  return async function(app, args, config) {
    const logger = new Signale({ interactive: true });
    logger.await('Starting static UI build...');

    const { builder, ui } = await build(app, config);

    logger.success(
      `Static UI build complete (${builder.stats.pages.length} pages built, ${
        builder.stats.files.length
      } files copied)`
    );

    if (args.serve) {
      const server = new Server({
        port: args.port || ui.config.build.server.port,
        assets: [{ src: ui.config.build.dest }]
      });
      await server.start();

      this.success('Serving build directory');

      this.log(`
        ---
        Local:   ${cyan(`http://${server.hostname}:${server.port}`)}
        Network: ${cyan(`http://${server.address}:${server.port}`)}
        ---
      `);

      process.on('SIGINT', () => {
        server.stop();
        this.br().success('Build directory server stopped');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };
};
