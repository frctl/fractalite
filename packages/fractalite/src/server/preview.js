const { extname } = require('path');
const { isFunction, pick, mapValues, cloneDeep } = require('lodash');
const flatten = require('flat');
const { rewriteUrls } = require('@frctl/fractalite-support/html');
const { defaultsDeep, toArray, processStack } = require('@frctl/fractalite-support/utils');
const { getScenario, getScenarioOrDefault, getComponent } = require('@frctl/fractalite-core/helpers');
const { createRenderer } = require('@frctl/fractalite-core');
const { map } = require('asyncro');

module.exports = function(app, compiler, renderer, opts = {}) {
  const previewAssets = { css: [], js: [], scripts: [], stylesheets: [] };
  const hooks = {
    beforeScenarioRender: [],
    afterScenarioRender: [],
    beforePreviewRender: [],
    afterPreviewRender: []
  };

  app.extend({
    addPreviewStylesheet(url) {
      previewAssets.stylesheets.push(url);
      return app;
    },
    addPreviewCSS(css) {
      previewAssets.css.push(css);
      return app;
    },
    addPreviewScript(url) {
      previewAssets.scripts.push(url);
      return app;
    },
    addPreviewJS(js) {
      previewAssets.js.push(js);
      return app;
    },
    beforeScenarioRender(fn) {
      hooks.beforeScenarioRender.push(fn);
      return app;
    },
    afterScenarioRender(fn) {
      hooks.afterScenarioRender.push(fn);
      return app;
    },
    beforePreviewRender(fn) {
      hooks.beforePreviewRender.push(fn);
      return app;
    },
    afterPreviewRender(fn) {
      hooks.afterPreviewRender.push(fn);
      return app;
    }
  });

  app.utils.renderPreview = async (component, scenario, runtimeOpts = {}) => {
    const state = compiler.getState();
    const hookCtx = { ...state, component, scenario };

    // allow hooks to manipulate the props array before rendering
    previewProps = await applyHooks('beforeScenarioRender', cloneDeep(scenario.preview.props), hookCtx);

    // Render the component once for each set of preview props
    let items = await renderer.renderAll(component, previewProps);

    // allow hooks to manipulate the rendered output
    items = await applyHooks('afterScenarioRender', items, hookCtx);

    const componentOpts = component.preview || {};
    const mergedOpts = defaultsDeep(runtimeOpts, componentOpts, pick(opts, ['meta', 'wrap', 'wrapEach']));

    // Wrap rendered preview items
    const { wrap, wrapEach } = mergedOpts;
    const wrapCtx = { component, scenario };
    let html = isFunction(wrapEach) ? items.map((...args) => wrapEach(...args, wrapCtx)) : items;
    html = html.join('\n');
    html = isFunction(wrap) ? wrap(html, wrapCtx) : html;

    const resolvePaths = path => {
      if (path.startsWith('./')) {
        const file = component.files.find(file => `./${file.relative}` === path);
        return file ? file.url : path;
      }
      return path;
    };

    // Resolve the stylesheets and scripts for use in the preview
    const stylesheets = processStack(previewAssets.stylesheets, opts.stylesheets, componentOpts.stylesheets, resolvePaths);
    const scripts = processStack(previewAssets.scripts, opts.scripts, componentOpts.scripts, resolvePaths);

    if (mergedOpts.reload) {
      scripts.push(app.resourceUrl('app:reload.js'));
    }

    mergedOpts.js = previewAssets.js.concat(mergedOpts.js);
    mergedOpts.css = previewAssets.css.concat(mergedOpts.css);

    // allow hooks to manipulate the preview object
    let preview = { ...mergedOpts, scripts, stylesheets, content: html };
    preview = await applyHooks('beforePreviewRender', preview, hookCtx);

    const output = await app.views.renderAsync('preview', preview);

    return applyHooks('beforePreviewRender', output, hookCtx);
  };

  // Replace relative URLs in preview props prior to rendering
  app.beforeScenarioRender((previewProps, { component }) => {
    return previewProps.map(props => {
      props = mapValues(flatten(props), value => replaceRelativeUrl(value, component));
      return flatten.unflatten(props);
    });
  });

  // Rewrite links to other components in the templates
  app.afterPreviewRender((html, { component }) => {
    return rewriteUrls(html, path => {
      if (path.startsWith('@') && !extname(path)) {
        const [componentName, scenarioName] = path.replace('@', '').split('/');
        const component = getComponent(state, componentName);
        if (component) {
          const scenario = getScenarioOrDefault(component, scenarioName);
          return scenario.previewUrl;
        }
      }
    });
  });

  app.addRoute('preview', `/preview/:component/:scenario`, async (ctx, next) => {
    const scenario = getScenario(ctx.component, ctx.params.scenario, true);
    ctx.body = await app.utils.renderPreview(ctx.component, scenario, {
      reload: opts.reload === true
    });
  });

  app.utils.addReferenceLookup('preview', (state, identifier) => {
    const [componentName, scenarioName] = identifier.split('/');
    const component = getComponent(state, componentName, true);
    const scenario = getScenarioOrDefault(component, scenarioName, true);
    return {
      url: app.url('preview', { component, scenario: scenario.name })
    };
  });

  /*
   * Middleware to add preview urls to variants.
   */
  compiler.use(async (components, next) => {
    await next();
    components.forEach(component => {
      component.scenarios.forEach(scenario => {
        scenario.previewUrl = app.url('preview', {
          component: component.name,
          scenario: scenario.name
        });
      });
    });
  });

  /*
   * Middleware to add preview data from config files.
   */
  compiler.use(components => {
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

      component.scenarios.forEach(scenario => {
        scenario.preview = {};
        scenario.preview.props = toArray(scenario.config.preview || {}).map(pp => {
          return defaultsDeep(pp, scenario.config.props);
        });
      });
    });
  });

  /*
   * Compiler middleware to expand the relative urls in view templates
   */
  compiler.use(async (components, next) => {
    await next();
    await map(components, async component => {
      component.files.forEach(async file => {
        if (file.isHTMLFragment) {
          let contents = await file.getContents();
          contents = rewriteUrls(contents, path => replaceRelativeUrl(path, component));
          file.setContents(contents);
        }
      });
    });
  });

  /*
   * Compiler middleware to expand any relative urls in scenario prop values
   */
  compiler.use(async (components, next) => {
    await next();
    components.forEach(component => {
      component.scenarios.forEach(scenario => {
        const props = mapValues(flatten(scenario.props), value => replaceRelativeUrl(value, component));
        scenario.props = flatten.unflatten(props);
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

  async function applyHooks(name, target, ctx) {
    for (const hook of hooks[name]) {
      target = await hook(target, ctx); // TODO: validate return target
    }
    return target;
  }
};
