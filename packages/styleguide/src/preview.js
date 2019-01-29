const { extname } = require('path');
const { flatMap, isFunction, pick } = require('lodash');
const { stack, resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
const { defaultsDeep, toArray } = require('@fractalite/support/utils');
const { File, Asset } = require('@fractalite/core');
const { get } = require('lodash');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function previewPlugin(app) {
    app.addRoute('preview', `/${opts.mount || 'preview'}/:variant(.+)`, async (ctx, next) => {
      return ctx.renderString(
        opts.content || `{{ renderPreview(variant, variant.previewProps) | await | safe }}`
      );
    });

    app.addViewGlobal('renderPreview', async (target, props = [], runtimeOpts = {}) => {
      const { api } = app;
      const items = await api.renderAll(target, props);
      const { component, variant } = api.resolveComponent(target);

      const componentOpts = component.preview || {};
      const mergedOpts = defaultsDeep(
        runtimeOpts,
        componentOpts,
        pick(opts, ['meta', 'wrap', 'wrapEach'])
      );

      // wrap rendered preview items
      const { wrap, wrapEach } = mergedOpts;
      const ctx = { component, variant };
      let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, ctx)) : items;
      html = html.join('\n');
      html = isFunction(wrap) ? wrap(html, ctx) : html;

      // resolve asset references for stylesheets and scripts
      const lookupFile = path => {
        const file = resolveFileUrl(path, component.files, api.files, api.assets);
        if (file) {
          return Asset.isAsset(file) ? app.url('asset', { asset: file }) : app.url('src', { file });
        }
        return path;
      };

      const stylesheets = stack(opts.stylesheets, componentOpts.stylesheets).map(lookupFile);
      const scripts = stack(opts.scripts, componentOpts.scripts).map(lookupFile);

      Object.assign(mergedOpts, { scripts, stylesheets });

      return app.adapter.generatePreview(html, mergedOpts, { api });
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
     * Middleware to add preview data from config files.
     */
    app.compiler.use(async function({ components }) {
      await map(components, async component => {
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
