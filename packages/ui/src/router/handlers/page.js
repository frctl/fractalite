const { flatten, isString } = require('lodash');
const { mergeSrcRefs } = require('@fractalite/support/helpers');

module.exports = function(route, routes) {
  return async function({ params, state, config, app, assets, utils }) {
    const page = state.pages.find(page => page.urlPath === (params._ || ''));
    if (!page) {
      if (!params._) {
        try {
          return await this.render('index');
        } catch (err) {
          return;
        }
      }
      return;
    }
    const context = { page };
    /*
    if (page.preview) {
      // render the page as a component preview

      const previewOpts = config.preview;
      const previewRoute = routes.find(route => route.name === 'preview');
      const view = isString(page.preview) ? page.preview : previewRoute.view;

      const stylesheets = mergeSrcRefs(
        flatten([previewOpts.stylesheets || [], page.stylesheets || []])
      );
      const scripts = mergeSrcRefs(flatten([previewOpts.scripts || [], page.scripts || []]));

      context['stylesheets'] = stylesheets.map(ref => assets.getMountedPath(ref));
      context['scripts'] = scripts.map(ref => assets.getMountedPath(ref));
      context['content'] = await app.render(page.content, { page });

      return view ? this.render(view, context) : content;
    }
    */
    const view = page.view || route.view;
    const content = await this.renderString(page.content, context, { markdown: true });
    return view ? this.render(view, Object.assign(context, { content })) : content;
  };
};
