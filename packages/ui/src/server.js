const ip = require('ip');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const compress = require('koa-compress');
const getPort = require('get-port');
const { normalizePath } = require('@fractalite/support/utils');

class Server {
  constructor(opts = {}) {
    this._opts = opts;
    const app = new Koa();
    this._app = app;
    app.use(compress(opts.compress));
    for (const assetSource of opts.assets || []) {
      const assetServer = serve(normalizePath(assetSource.src));
      this.use(assetSource.mount ? mount(assetSource.mount, assetServer) : assetServer);
    }
  }

  use(middleware) {
    this._app.use(middleware);
    return this;
  }

  async start(port) {
    const availablePort = await getPort({
      port: port || this._opts.port
    });
    return new Promise((resolve, reject) => {
      const httpServer = this._app.listen(availablePort, err => {
        if (err) {
          return reject(err);
        }
        this._port = availablePort;
        this._server = httpServer;
        resolve(this);
      });
    });
  }

  stop() {
    if (!this.started) {
      throw new Error('Server has not been started');
    }
    this._server.close();
    this._server = undefined;
    return this;
  }

  get started() {
    return Boolean(this._server);
  }

  get port() {
    if (this.started) {
      return this._port;
    }
    return null;
  }

  get hostname() {
    if (this.started) {
      return this._opts.hostname || 'localhost';
    }
    return null;
  }

  get address() {
    if (this.started) {
      return ip.address();
    }
    return null;
  }

  get httpServer() {
    return this._server;
  }
}

module.exports = Server;
