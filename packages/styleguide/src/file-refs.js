const { Asset } = require('@fractalite/core');
const { mapValues } = require('lodash');
const { resolveFileUrl, collect, rewriteUrls } = require('@fractalite/support/helpers');
const flatten = require('flat');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function fileRefsPlugin(app) {
    if (opts === false) return;

    if (opts.relative !== false) {
      /*
       * Compiler middleware to expand the relative urls in view templates
       */
      app.compiler.use(async ({ components, assets }, next) => {
        await next();
        await map(components, async component => {
          const view = collect(component.files).matchOne(
            'basename',
            app.adapter.opts.view,
            component
          );
          if (view) {
            let contents = await view.getContents();
            contents = rewriteUrls(contents, path => {
              if (path.startsWith('./')) {
                const file = resolveFileUrl(path, component.files);
                return file ? path.replace(/^.\//, `@${component.name}/`) : null;
              }
            });
            view.setContents(contents);
          }
        });
      });

      /*
       * Compiler middleware to expand any relative urls in variant prop values
       */
      app.compiler.use(async ({ components, assets }, next) => {
        await next();
        components.forEach(component => {
          component.variants.forEach(variant => {
            let props = flatten(variant.props);
            props = mapValues(props, value => {
              if (typeof value === 'string' && value.startsWith('./')) {
                const file = resolveFileUrl(value, component.files);
                return file ? value.replace(/^.\//, `@${component.name}/`) : value;
              }
              return value;
            });
            variant.props = flatten.unflatten(props);
          });
        });
      });
    }

    /*
     * Post-render adapter plugin to re-write url
     * attribute values in rendered output.
     */
    app.adapter.use((str, { component, api }) => {
      return rewriteUrls(str, path => {
        const file = resolveFileUrl(path, component.files, api.files, api.assets);
        if (opts.relative === false && path.startsWith('./')) {
          return;
        }
        if (file) {
          return Asset.isAsset(file) ? app.url('asset', { asset: file }) : app.url('src', { file });
        }
      });
    });
  };
};
