const Router = require('koa-router');
const pathToRegExp = require('path-to-regexp');

module.exports = function() {
  const router = new Router();

  router.add = function(route) {
    const { name, url, handler } = route;

    // Decorate the callback
    const callback = function(ctx, next) {
      ctx.route = route;
      return handler ? handler(ctx, next) : next();
    };

    const existingRoute = router.route(name);
    if (existingRoute) {
      // If the route has already been created,
      // override any specified properties
      const { stack, opts } = existingRoute;
      if (url) {
        existingRoute.path = url;
        existingRoute.paramNames = [];
        existingRoute.regexp = pathToRegExp(url, existingRoute.paramNames, opts);
      }
      existingRoute.stack = handler ? [callback] : stack;
    } else {
      router.get(name, url, callback); // Add route to the router
    }
  };

  return router;
};
