const { find, uniq, clone } = require('lodash');
const { toArray } = require('@fractalite/support/utils');
const Router = require('koa-router');
const pathToRegExp = require('path-to-regexp');

module.exports = function() {
  const router = new Router();
  const errorHandlers = [];

  router.add = function(route) {
    let { name, url, handler } = route;

    // decorate the callback
    const callback = async function(ctx, next) {
      ctx.route = route;
      return handler ? handler(ctx, next) : next();
    };

    const existingRoute = router.route(name);
    if (existingRoute) {
      // if the route has already been created,
      // override any specified properties
      const { path, stack, opts } = existingRoute;
      if (url) {
        existingRoute.path = url;
        existingRoute.paramNames = [];
        existingRoute.regexp = pathToRegExp(url, existingRoute.paramNames, opts);
      }
      existingRoute.stack = handler ? [callback] : stack;
    } else if (url) {
      router.get(name, url, callback); // add route to the router
    } else {
      errorHandlers.push({ name, callback });
    }
  };

  function getErrorHandler(name) {
    let handler = find(errorHandlers, { name: String(name) });
    handler = handler || find(errorHandlers, { name: 'error' });
    return handler ? handler.callback : null;
  }

  router.errors = function() {
    return async function(ctx, next) {
      try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
          ctx.throw(404, 'Page not found');
        }
      } catch (err) {
        ctx.state.error = ctx.error = err;
        err.path = ctx.path;
        ctx.status = err.status || 500;
        handler = getErrorHandler(ctx.status);
        if (handler) {
          await handler(ctx, next);
          ctx.body = ctx.body || err.message;
          ctx.app.emit('error', err, ctx);
        } else {
          ctx.throw(ctx.status, err);
        }
      }
    };
  };

  return router;
};
