const { extname, basename } = require('path');
const { isPlainObject, isFunction, isString, mapValues, cloneDeep } = require('lodash');
const flatten = require('flat');
const { rewriteUrls } = require('@frctl/fractalite-support/html');
const { defaultsDeep, toArray, normalizePath } = require('@frctl/fractalite-support/utils');
const { getScenario, getScenarioOrDefault, getComponent } = require('@frctl/fractalite-core/helpers');
const { map } = require('asyncro');

const defaultOpts = {
  meta: {},
  scripts: [],
  stylesheets: [],
  js: [],
  css: [],
  wrap: null,
  wrapEach: null
};

module.exports = function(app, compiler, renderer, opts = {}) {
  const previewAssets = { css: [], js: [], scripts: [], stylesheets: [] };
  const previewWrappers = { each: [], all: [] };
  const hooks = {
    beforeScenarioRender: [],
    afterScenarioRender: [],
    beforePreviewRender: [],
    afterPreviewRender: []
  };

  opts = defaultsDeep(opts, defaultOpts);

  const previewTpl = opts.template;

  app.extend({
    addPreviewStylesheet(url, path) {
      previewAssets.stylesheets.push(url);
      if (path) app.serveFile(url, path);
      return app;
    },
    addPreviewCSS(css) {
      previewAssets.css.push(css);
      return app;
    },
    addPreviewScript(url, path) {
      previewAssets.scripts.push(url);
      if (path) app.serveFile(url, path);
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
    },
    addPreviewWrapper(wrapper, each = false) {
      if (each) {
        previewWrappers.each.push(wrapper);
      } else {
        previewWrappers.all.push(wrapper);
      }
    }
  });

  /*
   * Serve all assts specified in the preview config opts
   *
   * Assets can be specified as:
   * - A full URL: `http://example.com/styles.css`
   * - A filesystem path of a file: `./assets/styles.css` or `/Users/mark/blah/assets/styles.css`
   * - an object with `path` and `url` properties: { path: `./assets/styles.css`, url: '/my-app/styles.css' }
   */
  opts.stylesheets.forEach(stylesheet => {
    const { path, url } = resolveAsset(stylesheet);
    app.addPreviewStylesheet(url, path);
  });
  opts.scripts.forEach(script => {
    const { path, url } = resolveAsset(script);
    app.addPreviewScript(url, path);
  });

  if (opts.wrap) {
    app.addPreviewWrapper(opts.wrap, false);
  }
  if (opts.wrapEach) {
    app.addPreviewWrapper(opts.wrapEach, true);
  }

  /*
   * Render a scenario preview for a component.
   *
   * Hooks allow for plugin-level customisation of
   * the preview rendering process.
   */
  app.utils.renderPreview = async (component, scenario, runtimeOpts = {}) => {
    const state = compiler.getState();
    const hookCtx = { ...state, component, scenario };

    // Allow hooks to manipulate the props array before rendering
    const previewProps = await applyHooks('beforeScenarioRender', cloneDeep(scenario.preview.props), hookCtx);

    // Render the component once for each set of preview props
    let items = await renderer.renderAll(component, previewProps);

    // Allow hooks to manipulate the rendered output
    items = await applyHooks('afterScenarioRender', items, hookCtx);

    const componentOpts = component.preview;
    const meta = defaultsDeep(componentOpts.meta, opts.meta);

    /*
     * Apply preview wrappers.
     *
     * Each scenario instance is wrapped first, with wrappers defined on
     * the component being applied first and global wrappers applied after.
     *
     * Then the scenario instances are joined into one HTML fragment and
     * the outer `wrap` wrappers are applied, component first and then global.
     */
    const wrapAll = [...previewWrappers.all, componentOpts.wrap];
    const wrapEach = [...previewWrappers.each, componentOpts.wrapEach];
    const wrapCtx = { component, scenario };

    for (const wrapper of wrapEach.reverse()) {
      if (isFunction(wrapper)) {
        items = items.map((item, index, items) => wrapper(item, { ...wrapCtx, index, items }));
      }
    }

    let html = items.join('\n');

    for (const wrapper of wrapAll.reverse()) {
      if (isFunction(wrapper)) {
        html = wrapper(html, wrapCtx);
      }
    }

    /*
     * Resolve stylesheets, scripts and 'inline' CSS/JS
     *
     * Components can only reference local scripts/stylesheets via
     * relative paths, use a resourceUrl reference to link to a public
     * directory file or point to an external URL. Linking to arbitary
     * files by supplying a path (as in the global preview options) is not supported.
     */
    const css = app.utils.prettify(previewAssets.css.concat(componentOpts.css).join('\n'), 'css');
    const js = app.utils.prettify(previewAssets.js.concat(componentOpts.js).join('\n'), 'js');

    const componentStylesheets = componentOpts.stylesheets.map(path => resolveComponentAsset(path, component));
    const componentScripts = componentOpts.scripts.map(path => resolveComponentAsset(path, component));

    const stylesheets = [...previewAssets.stylesheets, ...componentStylesheets];
    const scripts = [...previewAssets.scripts, ...componentScripts];

    if (runtimeOpts.reload) {
      scripts.push(app.resourceUrl('app:reload.js'));
    }

    // Allow hooks to manipulate the preview object
    html = renderer.getPreviewString(html);

    let preview = { js, css, meta, scripts, stylesheets, content: html, component, scenario };
    preview = await applyHooks('beforePreviewRender', preview, hookCtx);

    let output;

    // Custom preview template handling
    if (previewTpl) {
      if (isFunction(previewTpl)) {
        output = await previewTpl(preview.content, preview); // Completely bespoke preview renderer
      } else if (isString(previewTpl)) {
        // Custom Nunjucks preview template
        output = await app.views.renderStringAsync(previewTpl, preview);
      }
    } else {
      // Standard Nunjucks preview template
      output = await app.views.renderAsync('preview', preview);
    }

    // Apply final hook to allow tweaking of output HTML
    output = await applyHooks('beforePreviewRender', output, hookCtx);

    return app.utils.prettify(output, 'html');
  };

  // Replace relative URLs in preview props prior to rendering
  app.beforeScenarioRender((previewProps, { component }) => {
    return previewProps.map(props => {
      props = mapValues(flatten(props), value => replaceRelativeUrl(value, component));
      return flatten.unflatten(props);
    });
  });

  // Rewrite links to other components in the templates
  app.afterPreviewRender((html, state) => {
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
      reload: app.mode === 'develop' && opts.reload === true
    });
  });

  app.addBuilder((state, { request }) => {
    state.components.forEach(component => {
      component.scenarios.forEach(scenario => {
        request({ name: 'preview', params: { component, scenario: scenario.name } });
      });
    });
  });

  app.utils.addReferenceLookup('preview', (state, identifier) => {
    const [componentName, scenarioName] = identifier.split('/');
    const component = getComponent(state, componentName, true);
    const scenario = getScenarioOrDefault(component, scenarioName, true);
    return {
      url: scenario.previewUrl
    };
  });

  /*
   * Middleware to add preview urls to variants.
   *
   * Preview URLs are not handle client-side so they
   * need to point to the statically export file
   * in `build` mode
   */
  compiler.use(async (components, next) => {
    await next();
    components.forEach(component => {
      component.scenarios.forEach(scenario => {
        scenario.previewUrl = app.url(
          'preview',
          {
            component: component.name,
            scenario: scenario.name
          },
          app.mode === 'build' ? app.modeOpts.paths : undefined
        );
      });
    });
  });

  /*
   * Middleware to add preview data from config files.
   */
  compiler.use(components => {
    components.forEach(component => {
      const previewConfig = component.config.preview || {};
      component.preview = defaultsDeep(previewConfig, defaultOpts, {
        meta: {
          title: `${component.label} | Preview`
        }
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
      target = await hook(target, ctx); // eslint-disable-line no-await-in-loop
    }
    return target;
  }

  function resolveAsset(asset) {
    let path;
    let url;
    if (isString(asset)) {
      if (asset.startsWith('//') || asset.includes('://')) {
        url = asset; // Full URL, use as-is
      } else if (asset.includes(':')) {
        // Reference a file in a static directory
        url = app.resourceUrl(asset);
      } else {
        // Assume it's a path
        path = asset;
      }
    } else if (isPlainObject(asset)) {
      path = asset.path;
      url = asset.url;
      if (!path && !url) {
        throw new Error(`Cannot add asset - either a .url or a .path property must be defined`);
      }
    } else {
      throw new Error(`Cannot add asset - either a string or an object description is required`);
    }
    path = path ? normalizePath(path) : path;
    if (!url) {
      url = `/${basename(path)}`;
    }
    return { path, url };
  }

  function resolveComponentAsset(path, component) {
    if (isString(path)) {
      if (path.startsWith('./')) {
        const file = component.files.find(file => `./${file.relative}` === path);
        if (!file) {
          throw new Error(`Preview asset '${path}' not found`);
        }
        return file.url;
      }
      if (path.startsWith('//') || path.includes('://')) {
        return path;
      }
      if (path.includes(':')) {
        return app.resourceUrl(path);
      }
    }
    throw new Error(`Invalid component preview asset path`);
  }
};
