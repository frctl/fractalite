module.exports = function(route) {
  return async function({ params, state, config }) {
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
    const content = await this.renderString(page.content, context, { markdown: true });
    const view = page.view || route.view;
    return view ? this.render(view, Object.assign(context, { content })) : content;
  };
};
