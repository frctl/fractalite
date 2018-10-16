module.exports = function(route) {
  return async function({ params, state, config }) {
    const page = state.pages.find(page => page.urlPath === params._);
    if (!page) {
      return this.throw(`Page not found`, 404);
    }
    const opts = { markdown: true };
    const context = { page };
    const contents = await this.renderString(page.contents, context, opts);
    const view = page.layout || route.view;
    return view ? this.render(view, Object.assign(context, { contents })) : contents;
  };
};
