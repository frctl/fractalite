/* eslint-disable unicorn/no-process-exit */

const { cyan } = require('kleur');
const { develop } = require('@fractalite/ui');

module.exports = function dev(opts = {}) {
  return async function(app, args, config) {
    const { server } = await develop(app, config.ui);

    this.success('UI server started');

    this.log(`
      ---
      Local:   ${cyan(`http://${server.hostname}:${server.port}`)}
      Network: ${cyan(`http://${server.address}:${server.port}`)}
      ---
    `);

    app.on('error', err => this.error(err));

    process.on('SIGINT', () => {
      server.stop();
      this.br().success('UI server stopped');
      process.exit(0);
    });
  };
};

module.exports.description = 'Start the UI development server';
