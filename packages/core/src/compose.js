// Adapted from Koa Compose: https://github.com/koajs/compose

module.exports = function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  return function(context, next) {
    // Last called middleware #
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve(context);
      try {
        let called = false;
        const trigger = dispatch.bind(null, i + 1);
        const rawResult = fn(context, () => {
          called = true;
          return trigger();
        });
        const result = Array.isArray(rawResult) ? await Promise.all(rawResult) : await Promise.resolve(rawResult);
        // if (result) {
        //   context = result;
        // }
        if (!called) {
          await trigger();
        }
        return result;
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
};
