const { extname } = require('path');
const { isFunction, pick, mapValues } = require('lodash');
const flatten = require('flat');
const { rewriteUrls } = require('@frctl/fractalite-support/html');
const { defaultsDeep, toArray, processStack } = require('@frctl/fractalite-support/utils');
const { getContext, getContextOrDefault, getComponent, getAsset } = require('@frctl/fractalite-core/helpers');
const { createRenderer } = require('@frctl/fractalite-core');
const { map } = require('asyncro');

module.exports = function(app, adapter, opts = {}) {
  const preview = { css: [], js: [], scripts: [], stylesheets: [] };

  app.extend({
    addPreviewStylesheet(url) {
      preview.stylesheets.push(url);
      return app;
    },
    addPreviewCSS(css) {
      preview.css.push(css);
      return app;
    },
    addPreviewScript(url) {
      preview.scripts.push(url);
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

    // Replace relative URLs in preview props
    const previewProps = context.previewProps.map(props => {
      props = mapValues(flatten(props), value => replaceRelativeUrl(value, component));
      return flatten.unflatten(props);
    });

    // Render the component once for each set of preview props
    const items = await renderer.renderAll(component, previewProps);

    const componentOpts = component.preview || {};
    const mergedOpts = defaultsDeep(runtimeOpts, componentOpts, pick(opts, ['meta', 'wrap', 'wrapEach']));

    // Wrap rendered preview items
    const { wrap, wrapEach } = mergedOpts;
    const wrapCtx = { component, context };
    let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, wrapCtx)) : items;
    html = html.join('\n');
    html = isFunction(wrap) ? wrap(html, wrapCtx) : html;

    const resolvePaths = path => {
      if (path.startsWith('./')) {
        const file = component.files.find(file => `./${file.relative}` === path);
        return file ? file.url : path;
      }
      const asset = getAsset(state, path);
      return asset ? asset.url : path;
    };

    // Resolve the stylesheets and scripts for use in the preview
    const stylesheets = processStack(preview.stylesheets, opts.stylesheets, componentOpts.stylesheets, resolvePaths);
    const scripts = processStack(preview.scripts, opts.scripts, componentOpts.scripts, resolvePaths);

    if (mergedOpts.reload) {
      scripts.push(app.resourceUrl('app:reload.js'));
    }

    mergedOpts.js = preview.js.concat(mergedOpts.js);
    mergedOpts.css = preview.css.concat(mergedOpts.css);

    const rendered = await app.views.renderAsync('preview', {
      ...mergedOpts,
      scripts,
      stylesheets,
      content: renderer.getPreviewString(html)
    });

    // Rewrite links to other components in the templates
    return rewriteUrls(rendered, path => {
      if (path.startsWith('@') && !extname(path)) {
        const [componentName, contextName] = path.replace('@', '').split('/');
        const component = getComponent(state, componentName);
        if (component) {
          const context = getContextOrDefault(component, contextName);
          return context.previewUrl;
        }
      }
    });
  };

  app.addRoute('preview', `/preview/:component/:context`, async (ctx, next) => {
    const context = getContext(ctx.component, ctx.params.context, true);
    ctx.body = await app.utils.renderPreview(ctx.component, context, {
      reload: opts.reload === true
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
   * Compiler middleware to expand any relative urls in context previewProp values
   */
  app.compiler.use(async ({ components, assets }, next) => {
    await next();
    components.forEach(component => {
      component.contexts.forEach(context => {
        const props = mapValues(flatten(context.props), value => replaceRelativeUrl(value, component));
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
