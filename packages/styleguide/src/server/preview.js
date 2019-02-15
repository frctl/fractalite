const { extname } = require('path');
const { isFunction, pick, mapValues } = require('lodash');
const flatten = require('flat');
const { rewriteUrls } = require('@fractalite/support/html');
const { defaultsDeep, toArray, processStack } = require('@fractalite/support/utils');
const { getContext, getContextOrDefault, getComponent, getAsset } = require('@fractalite/core/helpers');
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

  app.utils.renderPreview = async (component, context, runtimeOpts = {}) => {
    const state = app.compiler.getState();
    const renderer = createRenderer(state, adapter);

    // replace relative URLs in preview props
    const previewProps = context.previewProps.map(props => {
      props = mapValues(flatten(props), value => replaceRelativeUrl(value, component));
      return flatten.unflatten(props);
    });

    // render the component once for each set of preview props
    const items = await renderer.renderAll(component, previewProps);

    const componentOpts = component.preview || {};
    const mergedOpts = defaultsDeep(runtimeOpts, componentOpts, pick(opts, ['meta', 'wrap', 'wrapEach']));

    // Wrap rendered preview items
    const { wrap, wrapEach } = mergedOpts;
    const wrapCtx = { component, context };
    let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, wrapCtx)) : items;
    html = html.join('\n');
    html = isFunction(wrap) ? wrap(html, wrapCtx) : html;

    // resolve the stylesheets and scripts for use in the preview
    const stylesheets = processStack(opts.stylesheets, componentOpts.stylesheets);
    const scripts = processStack(opts.scripts, componentOpts.scripts);

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

    // rewrite url attribute references as required
    return rewriteUrls(rendered, path => {
      if (path.startsWith('./')) {
        const file = component.files.find(file => `./${file.relative}` === path);
        return file ? file.url : null;
      }
      if (path.startsWith('@') && !extname(path)) {
        const [componentName, contextName] = path.replace('@', '').split('/');
        const component = getComponent(state, componentName);
        if (component) {
          const context = getContextOrDefault(component, contextName);
          return context.previewUrl;
        }
      }
      const asset = getAsset(state, path);
      return asset ? asset.url : null;
    });
  };

  app.addRoute('preview', `/preview/:component/:context`, async (ctx, next) => {
    const context = getContext(ctx.component, ctx.params.context, true);
    ctx.body = await app.utils.renderPreview(ctx.component, context, {
      reload: true
    });
  });

  app.utils.addReferenceLookup('preview', (state, identifier) => {
    const [componentName, contextName] = identifier.split('/');
    const component = getComponent(state, componentName, true);
    const context = getContextOrDefault(component, contextName, true);
    return {
      url: app.url('preview', { component, context: context.name })
    };
  });

  /*
   * Middleware to add preview urls to variants.
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.contexts.forEach(context => {
        context.previewUrl = app.url('preview', {
          component: component.name,
          context: context.name
        });
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

      component.contexts.forEach(context => {
        context.previewProps = toArray(context.config.previewProps || {}).map(pp => {
          return defaultsDeep(pp, context.config.props);
        });
      });
    });
  });

  /*
   * Compiler middleware to expand any relative urls in context previewProp values
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.contexts.forEach(context => {
        let props = mapValues(flatten(context.props), value => replaceRelativeUrl(value, component));
        context.props = flatten.unflatten(props);
      });
    });
  });

  function replaceRelativeUrl(value, component) {
    if (typeof value === 'string' && value.startsWith('./')) {
      const file = component.files.find(file => `./${file.relative}` === value);
      return file ? app.url('src', { file }) : value;
    }
    return value;
  }
};
