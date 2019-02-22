const Router = require('koa-router');

module.exports = function() {
  const router = new Router();

  router.add = function(route) {
    const { name, url, handler } = route;

    // Decorate the callback
    const callback = function(ctx, next) {
      ctx.route = route;
      return handler ? handler(ctx, next) : next();
    };

    router.get(name, url, callback);
  };

  return router;
};
