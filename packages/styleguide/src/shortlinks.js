const { extname } = require('path');
const { Asset } = require('@fractalite/core');
const { mapValues } = require('lodash');
const { resolveFileUrl, collect, rewriteUrls } = require('@fractalite/support/helpers');
const flatten = require('flat');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function shortlinksPlugin(app) {
    if (opts === false) return;

    app.utils.replaceShortlinks = (str, componentRoute = 'preview') => {
      return rewriteUrls(str, path => {
        if (opts.relative === false && path.startsWith('./')) {
          return;
        }
        const file = resolveFileUrl(path, [], app.api.files, app.api.assets);
        if (file) {
          return Asset.isAsset(file) ? app.url('asset', { asset: file }) : app.url('src', { file });
        }
        if (path[0] === '@' && !extname(path)) {
          const [handle, route = componentRoute] = path.replace('@', '').split(':');
          return app.url(route, { handle });
        }
      });
    };

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
            contents = rewriteUrls(contents, path => replaceRelativeUrl(path, component));
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
            props = mapValues(props, value => replaceRelativeUrl(value, component));
            variant.props = flatten.unflatten(props);
          });
        });
      });
    }

    function replaceRelativeUrl(value, component) {
      if (typeof value === 'string' && value.startsWith('./')) {
        const file = resolveFileUrl(value, component.files);
        return file ? value.replace(/^.\//, `@${component.name}/`) : value;
      }
      return value;
    }
  };
};
