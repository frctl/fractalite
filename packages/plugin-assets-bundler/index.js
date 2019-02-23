const { dirname, basename, relative } = require('path');
const Bundler = require('parcel-bundler');
const prettier = require('prettier');
const { outputFile } = require('fs-extra');

module.exports = function(opts = {}) {
  return function(app) {
    app.beforeStart(async () => {
      const entryDir = dirname(opts.entryFile);
      const outDir = dirname(opts.outFile);
      const publicUrl = opts.publicUrl || '/assets';

      // Serve any assets generated in the output dir
      app.addStaticDir('bundled-assets', outDir, publicUrl);

      // If an entry generator is provided, use that to
      // dynamically create (and re-create) the entry file
      // when the compiler state changes
      await generateEntry(app.compiler.getState());

      let bundler = await createBundler(true);

      // When glob imports are used Parcel does not
      // correctly recognise when files are added/removed,
      // only when changed. This is the equivalent of manually
      // stopping and restarting the watch task/hmr server.
      app.on('state.updated', async (state, { event }) => {
        if (event === 'add' || event === 'unlink') {
          if (bundler) {
            try {
              await bundler.stop();
            } catch (err) {
              app.emit(err);
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
          await outputFile(opts.entryFile, prettier.format(entry, { parser: 'babel' }));
        } catch (err) {
          app.emit('error', err);
        }
      }

      async function createBundler(initial = false) {
        const bundler = new Bundler(opts.entryFile, {
          outDir,
          outFile: basename(opts.outFile),
          watch: app.mode === 'develop',
          logLevel: 3,
          publicUrl,
          hmrHostname: opts.hmrHostname || 'localhost',
          hmr: app.mode === 'develop' ? opts.hmr !== false : false
        });

        if (initial) {
          bundler.on('buildEnd', () => {
            if (opts.hmr === false) {
              app.socket.broadcast('refresh');
            }
          });
        }

        const bundle = await bundler.bundle();

        if (initial) {
          const bundles = addBundles(bundle);

          const assets = bundles.map(bundle => {
            return {
              url: `${publicUrl}/${relative(outDir, bundle.name)}`,
              type: bundle.type
            };
          });

          if (opts.addToPreview !== false) {
            // Automatically add the bundled scripts
            // and stylesheets to the preview
            for (const { type, url } of assets) {
              if (type === 'css') {
                app.addPreviewStylesheet(url);
              }
              if (type === 'js') {
                app.addPreviewScript(url);
              }
            }
          }
        }

        return bundler;

        function addBundles(bundle, bundles = []) {
          if (['js', 'css'].includes(bundle.type)) {
            bundles.push(bundle);
          }
          for (const childBundle of bundle.childBundles) {
            addBundles(childBundle, bundles);
          }
          return bundles;
        }
      }
    });
  };
};
