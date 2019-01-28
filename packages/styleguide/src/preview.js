const { extname } = require('path');
const { flatMap } = require('lodash');
const { stack, resolveFileUrl, collect, rewriteUrls } = require('@fractalite/support/helpers');
const { defaultsDeep } = require('@fractalite/support/utils');
const { File, Asset } = require('@fractalite/core');
const { get } = require('lodash');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function previewPlugin(app) {
    app.addRoute('preview', `/${opts.mount || 'preview'}/:variant(.+)`, async (ctx, next) => {
      return ctx.renderString(
        opts.content || `{{ api.renderPreview(variant, component.preview) | await | safe }}`
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
     * Paths that begin with `./` are relative to the component,
     * paths that begin with `@name/` are from other components,
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
     * Compiler middleware to expand the relative urls into @component urls
     * for later replacement in the post-render stage.
     */
    app.compiler.use(async function({ components, assets }, next) {
      await next();
      await map(components, async component => {
        const view = collect(component.files).matchOne(
          'basename',
          app.adapter.opts.view,
          component
        );
        if (view) {
          let contents = await view.getContents();
          contents = rewriteUrls(contents, function(path) {
            return path.startsWith('./') ? path.replace(/^.\//, `@${component.name}/`) : path;
          });
          view.setContents(contents);
        }
      });
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
        const file = resolveFileUrl(path, component.files, api.files, api.assets);
        if (file) {
          return Asset.isAsset(file) ? app.url('asset', { asset: file }) : app.url('src', { file });
        }
      });
    });
  };
};
