const IO = require('koa-socket-2');
const serve = require('koa-static');
const mount = require('koa-mount');
const { normalizePath } = require('@fractalite/support/utils');
const Router = require('./router');
const Assets = require('./assets');
const Server = require('./server');

class DevServer extends Server {
  constructor(opts = {}) {
    super(opts);
    this._io = new IO();
    this._io.attach(this._app);
  }

  on(evt, fn) {
    this._io.on(evt, fn);
    return this;
  }

  emit(evt, data = {}) {
    this._io.broadcast(evt, data);
    return this;
  }

  use(middleware) {
    if (middleware instanceof Assets) {
      const assets = middleware;
      for (const assetSource of assets) {
        const assetServer = serve(normalizePath(assetSource.src));
        this.use(assetSource.mount ? mount(assetSource.mount, assetServer) : assetServer);
      }
      return this;
    }

    if (middleware instanceof Router) {
      const router = middleware;
      this._app.use(async (ctx, next) => {
        try {
          await next();
          ctx.body = await router.handle(ctx.url);
        } catch (err) {
          if (ctx.socket) {
            ctx.socket.emit('log', {
              level: 'error',
              message: err.message,
              data: err.stack
            });
          }
          ctx.response.status = err.status || 500;
          // ctx.response.message = err.message;
          ctx.body = await router.handleError(ctx.url, err);
        }
      });
      return this;
    }

    this._app.use(middleware);
    return this;
  }
}

module.exports = DevServer;
