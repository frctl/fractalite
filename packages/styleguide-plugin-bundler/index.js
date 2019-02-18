const { dirname, basename, relative } = require('path');
const Bundler = require('parcel-bundler');
const { Signale } = require('signale');
const { outputFile } = require('fs-extra');

module.exports = function(opts = {}) {
  return function(app) {
    const logger = new Signale({ interactive: true });
    app.beforeStart(async () => {
      logger.await('Building assets...');

      const entryDir = dirname(opts.entryFile);
      const outDir = dirname(opts.outFile);
      const publicUrl = opts.publicUrl || '/assets';

      await generateEntry(app.compiler.getState());

      let bundler = await createBundler(true);

      // When glob imports are used Parcel does not
      // correctly recognise when files are added/removed,
      // only when changed. This is the equivalent of manually
      // stopping and restarting the watch task/hmr server.
      app.on('updated', async (state, { event }) => {
        if (event === 'add' || event === 'unlink') {
          if (bundler) {
            try {
              await bundler.stop();
            } catch (err) {
              logger.error(err);
            }
            await generateEntry(state);
            bundler = await createBundler();
            app.socket.broadcast('refresh');
          }
        }
      });

      async function generateEntry(state) {
        if (typeof opts.entryBuilder !== 'function') {
          return;
        }
        try {
          const entry = await opts.entryBuilder(state, { dir: entryDir });
          await outputFile(opts.entryFile, entry);
        } catch (err) {
          app.emit('error', err);
        }
      }

      async function createBundler(initial = false) {
        const bundler = new Bundler(opts.entryFile, {
          outDir,
          outFile: basename(opts.outFile),
          watch: app.mode === 'develop',
          logLevel: 0,
          publicUrl,
          hmrHostname: opts.hmrHostname || 'localhost',
          hmr: opts.hmr === false ? false : true
        });

        try {
          const bundle = await bundler.bundle();

          if (initial && opts.addToPreview !== false) {
            function addBundles(bundle, bundles = []) {
              if (['js', 'css'].includes(bundle.type)) {
                bundles.push(bundle);
              }
              for (const childBundle of bundle.childBundles) {
                addBundles(childBundle, bundles);
              }
              return bundles;
            }

            const bundles = addBundles(bundle);

            // add the bundled scripts and stylesheets to the preview
            for (const bundle of bundles) {
              const url = `${publicUrl}/${relative(outDir, bundle.name)}`;
              if (bundle.type === 'css') {
                app.addPreviewStylesheet(url);
              }
              if (bundle.type === 'js') {
                app.addPreviewScript(url);
              }
            }
          }

          logger.success('Assets build complete');
          bundler.on('buildStart', () => logger.await('Rebundling assets...'));
          bundler.on('buildEnd', () => {
            if (opts.hmr === false) {
              app.socket.broadcast('refresh');
            }
            logger.success('Asset bundling complete');
          });
          bundler.on('buildError', err => logger.error(err));
        } catch (err) {
          logger.error(err);
        }

        return bundler;
      }
    });
  };
};
