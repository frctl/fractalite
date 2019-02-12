const { mapValues } = require('lodash');
const { rewriteUrls } = require('@fractalite/support/html');
const { resolveReference } = require('@fractalite/core/helpers');
const { isAsset, isComponent, isFile, isVariant } = require('@fractalite/core/helpers');
const flatten = require('flat');
const { map } = require('asyncro');

module.exports = function(app, adapter, opts = {}) {
  if (opts === false) return;

  app.utils.resolveShortlink = (state, shortlink, componentRoute) => {
    const [ref, route = componentRoute] = shortlink.split(':');
    const target = resolveReference(state, ref);
    if (isAsset(target)) {
      return app.url('asset', { asset: target });
    }
    if (isFile(target)) {
      return app.url('src', { file: target });
    }
    if (componentRoute && (isComponent(target) || isVariant(target))) {
      return app.url(route, { handle: target });
    }
    return shortlink;
  };

  app.utils.replaceShortlinkAttrs = (state, str, componentRoute) => {
    return rewriteUrls(str, path => app.utils.resolveShortlink(state, path, componentRoute));
  };

  if (opts.relative !== false) {
    /*
       * Compiler middleware to expand the relative urls in view templates
       */
    app.compiler.use(async ({ components, assets }, next) => {
      await next();
      if (adapter.views) {
        await map(components, async component => {
          const view = component.matchFile(adapter.views);
          if (view) {
            let contents = await view.getContents();
            contents = rewriteUrls(contents, path => replaceRelativeUrl(path, component));
            view.setContents(contents);
          }
        });
      }
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
      const file = component.files.find(file => `./${file.relative}` === value);
      return file ? value.replace(/^.\//, `@${component.name}/`) : value;
    }
    return value;
  }
};
