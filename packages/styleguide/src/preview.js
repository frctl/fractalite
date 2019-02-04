const { extname } = require('path');
const { isFunction, pick } = require('lodash');
const { stack, resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
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

      const stylesheets = stack(opts.stylesheets, componentOpts.stylesheets).map(lookupFile);
      const scripts = stack(opts.scripts, componentOpts.scripts).map(lookupFile);

      if (mergedOpts.reload) {
        scripts.push(app.resourceUrl('styleguide:reload.js'));
      }

      Object.assign(mergedOpts, { scripts, stylesheets });

      return app.adapter.generatePreview(html, mergedOpts, { api });
    };

    app.addRoute('preview', `/${opts.mount || 'preview'}/:variant(.+)`, async (ctx, next) => {
      ctx.body = await app.renderPreview(ctx.variant, ctx.variant.previewProps, {
        reload: true
      });
    });

    // App.addBuildStep('preview', ({ requestRoute, api }) => {
    //   app.api.variants.forEach(variant => requestRoute('preview', { variant }));
    // });

    app.get('inspector.actions').push({
      label: 'Preview',
      icon: 'fas fa-external-link-square-alt',
      url: ({ variant }) => app.url('preview', { variant })
    });

    /*
     * Middleware to add preview urls to variants.
     */
    app.compiler.use(async ({ components, assets }, next) => {
      await next();
      components.forEach(component => {
        component.variants.forEach(variant => {
          variant.previewUrl = app.url('preview', { variant });
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
    // app.adapter.use((str, { component, api }) => {
    //   return rewriteUrls(str, path => {
    //     if (path[0] === '@' && !extname(path)) {
    //       return app.url('preview', { variant: path.replace('@', '') });
    //     }
    //   });
    // });
  };
};
