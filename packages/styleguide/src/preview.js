const { extname } = require('path');
const { flatMap } = require('lodash');
const { stack, resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
const { defaultsDeep } = require('@fractalite/support/utils');
const { File, Asset } = require('@fractalite/core');
const { get } = require('lodash');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function previewPlugin(app) {
    app.addRoute('preview', `/${opts.mount || 'preview'}/:variant(.+)`, async (ctx, next) => {
      return ctx.renderString(
        opts.content || `{{ renderPreview(variant, component.preview) | await | safe }}`
      );
    });

    // app.addBuildStep('preview', ({ requestRoute, api }) => {
    //   app.api.variants.forEach(variant => requestRoute('preview', { variant }));
    // });

    /*
     * Middleware to add preview urls to variants.
     */
    app.compiler.use(async function({ components, assets }, next) {
      await next();
      components.forEach(component => {
        component.variants.forEach(variant => {
          variant.previewUrl = app.url('preview', { variant });
        });
      });
    });

    /*
     * Middleware to read preview data from config files.
     */
    app.compiler.use(async function({ components }) {
      await map(components, async component => {
        const { config } = component;
        const stylesheets = stack(opts.stylesheets || [], get(config, 'preview.stylesheets', []));
        const scripts = stack(opts.scripts || [], get(config, 'preview.scripts', []));
        component.preview = defaultsDeep(config.preview || {}, {
          meta: {
            title: `${component.label} | Preview`
          }
        });
        component.preview = Object.assign(component.preview, {
          scripts,
          stylesheets
        });
      });
    });

    /*
     * Resolve preview asset URLs. Run after user-defined plugins.
     *
     * Paths that begin with `@name/` are component file url,
     * and other paths are assumed to be asset lookups.
     */
    app.compiler.use(async function({ components, assets }, next) {
      await next();
      const allFiles = flatMap(components, c => c.files);
      components.forEach(component => {
        const { preview, files } = component;
        const lookupFile = path => {
          const file = resolveFileUrl(path, files, allFiles, assets);
          if (file) {
            return Asset.isAsset(file)
              ? app.url('asset', { asset: file })
              : app.url('src', { file });
          }
          return path;
        };
        Object.assign(component.preview, {
          scripts: preview.scripts.map(lookupFile),
          stylesheets: preview.stylesheets.map(lookupFile)
        });
      });
    });

    /*
     * Compiler middleware to add the websocket reload JS to previews
     */
    app.compiler.use(async function({ components }, next) {
      await next();
      const reloadUrl = app.staticUrl('styleguide:reload.js');
      components.forEach(({ preview }) => preview.scripts.push(reloadUrl));
    });

    /*
     * Post-render adapter plugin to re-write url
     * attribute values in rendered output.
     */
    app.adapter.use(function(str, { component, api }) {
      return rewriteUrls(str, function(path) {
        if (path[0] === '@' && !extname(path)) {
          return app.url('preview', { variant: path.replace('@', '') });
        }
      });
    });
  };
};
