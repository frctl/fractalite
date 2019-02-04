const { extname } = require('path');
const { isFunction, pick } = require('lodash');
const { resolveStack, resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
const { defaultsDeep, toArray } = require('@fractalite/support/utils');
const { Asset } = require('@fractalite/core');

module.exports = function(opts = {}) {
  return function previewPlugin(app) {
    app.renderPreview = async function renderPreview(target, props = [], runtimeOpts = {}) {
      const { api } = app;
      const { component, variant } = api.resolveComponent(target);

      const items = await api.renderAll(target, props, false);
      const componentOpts = component.preview || {};
      const mergedOpts = defaultsDeep(
        runtimeOpts,
        componentOpts,
        pick(opts, ['meta', 'wrap', 'wrapEach'])
      );

      // Wrap rendered preview items
      const { wrap, wrapEach } = mergedOpts;
      const ctx = { component, variant };
      let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, ctx)) : items;
      html = html.join('\n');
      html = isFunction(wrap) ? wrap(html, ctx) : html;

      // Resolve asset references for stylesheets and scripts
      const lookupFile = path => {
        const file = resolveFileUrl(path, component.files, api.files, api.assets);
        if (file) {
          return Asset.isAsset(file) ? app.url('asset', { asset: file }) : app.url('src', { file });
        }
        return path;
      };

      const stylesheets = resolveStack(opts.stylesheets, componentOpts.stylesheets).map(lookupFile);
      const scripts = resolveStack(opts.scripts, componentOpts.scripts).map(lookupFile);

      if (mergedOpts.reload) {
        scripts.push(app.resourceUrl('styleguide:reload.js'));
      }

      Object.assign(mergedOpts, { scripts, stylesheets });

      return app.adapter.generatePreview(html, mergedOpts, { api });
    };

    app.addRoute('preview', `/${opts.mount || 'preview'}/:handle(.+)`, async (ctx, next) => {
      let { component, variant } = ctx.api.resolveComponent(ctx.params.handle);
      if (variant) {
        ctx.body = await app.renderPreview(variant, variant.previewProps, {
          reload: true
        });
      } else {
        ctx.body = '<em>No preview available</em>'; // TODO: handle this differently?
      }
    });

    // App.addBuildStep('preview', ({ requestRoute, api }) => {
    //   app.api.variants.forEach(variant => requestRoute('preview', { variant }));
    // });
    /*
     * Middleware to add preview urls to variants.
     */
    app.compiler.use(async ({ components, assets }, next) => {
      await next();
      components.forEach(component => {
        component.variants.forEach(variant => {
          variant.previewUrl = app.url('preview', { handle: variant });
        });
      });
    });

    /*
     * Middleware to add preview data from config files.
     */
    app.compiler.use(({ components }) => {
      components.forEach(component => {
        component.preview = defaultsDeep(component.config.preview || {}, {
          meta: {
            title: `${component.label} | Preview`
          },
          scripts: [],
          stylesheets: []
        });
        component.variants.forEach(variant => {
          variant.previewProps = toArray(variant.config.previewProps || {});
        });
      });
    });

    /*
     * Post-render adapter plugin to re-write url
     * attribute values in rendered output.
     */
    app.adapter.use(str => app.utils.replaceShortlinks(str, 'preview'));
  };
};
