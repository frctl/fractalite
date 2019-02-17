const { dirname, basename } = require('path');
const Bundler = require('parcel-bundler');
const { Signale } = require('signale');

module.exports = function(opts = {}) {
  return function(app) {
    const logger = new Signale({ interactive: true });
    app.beforeStart(async () => {
      logger.await('Building assets...');

      const bundler = new Bundler(opts.entryFile, {
        outDir: dirname(opts.outFile),
        outFile: basename(opts.outFile),
        watch: app.mode === 'develop',
        logLevel: 0
      });

      try {
        await bundler.bundle();
        logger.success('Assets build complete');
        bundler.on('buildStart', () => logger.await('Rebundling assets...'));
        bundler.on('buildStart', () => logger.success('Bundle rebuilt'));
        bundler.on('buildError', err => logger.error(err));
      } catch (err) {
        logger.error(err);
      }
    });
  };
};
