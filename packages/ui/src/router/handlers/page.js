module.exports = function(route) {
  return async function({ params, state, config }) {
    const page = state.pages.find(page => page.urlPath === (params._ || ''));
    if (!page) {
      return;
    }
    const context = { page };
    const content = await this.renderString(page.content, context, { markdown: true });
    const view = page.view || route.view;
    return view ? this.render(view, Object.assign(context, { content })) : content;
  };
};
