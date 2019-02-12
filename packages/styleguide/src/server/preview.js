const { isFunction, pick } = require('lodash');
const { defaultsDeep, toArray, processStack } = require('@fractalite/support/utils');
const { isVariant, getTarget, getVariant, getComponentFromVariant } = require('@fractalite/core/helpers');
const { createRenderer } = require('@fractalite/core');

module.exports = function(app, adapter, opts = {}) {
  const preview = { css: [], js: [] };

  app.extend({
    addPreviewCSS(css) {
      preview.css.push(css);
      return app;
    },

    addPreviewJS(js) {
      preview.js.push(js);
      return app;
    }
  });

  app.utils.renderPreview = async (state, target, props = [], runtimeOpts = {}) => {
    let component;
    let variant;
    const renderer = createRenderer(state, adapter);
    target = getTarget(state, target);

    if (isVariant(target)) {
      variant = target;
      component = getComponentFromVariant(state, target);
    } else {
      component = target;
    }

    const items = await renderer.renderAll(target, props);

    const componentOpts = component.preview || {};
    const mergedOpts = defaultsDeep(runtimeOpts, componentOpts, pick(opts, ['meta', 'wrap', 'wrapEach']));

    // Wrap rendered preview items
    const { wrap, wrapEach } = mergedOpts;
    const wrapCtx = { component, variant };
    let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, wrapCtx)) : items;
    html = html.join('\n');
    html = isFunction(wrap) ? wrap(html, wrapCtx) : html;

    // Resolve asset references for stylesheets and scripts
    const lookupFile = path => app.utils.resolveShortlink(state, path);

    const stylesheets = processStack(opts.stylesheets, componentOpts.stylesheets, lookupFile);
    const scripts = processStack(opts.scripts, componentOpts.scripts, lookupFile);

    if (mergedOpts.reload) {
      scripts.push(app.resourceUrl('app:reload.js'));
    }

    mergedOpts.js = preview.js.concat(mergedOpts.js);
    mergedOpts.css = preview.css.concat(mergedOpts.css);

    const rendered = await app.views.renderAsync('preview', {
      ...mergedOpts,
      scripts,
      stylesheets,
      content: html
    });

    return app.utils.replaceShortlinkAttrs(state, rendered, 'preview');
  };

  app.addRoute('preview', `/preview/:handle(.+)`, async (ctx, next) => {
    const variant = getVariant(ctx.state, ctx.params.handle);
    if (variant) {
      ctx.body = await app.utils.renderPreview(ctx.state, variant, variant.previewProps, {
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
        stylesheets: [],
        js: [],
        css: []
      });
      component.preview.js = toArray(component.preview.js);
      component.preview.css = toArray(component.preview.css);

      component.variants.forEach(variant => {
        variant.previewProps = toArray(variant.config.previewProps || {});
      });
    });
  });
};
