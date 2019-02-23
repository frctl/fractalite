const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const { normalizePath } = require('@frctl/fractalite-support/utils');

module.exports = function(dir, port = 0) {
  const serveOpts = {
    root: normalizePath(dir)
  };

  const app = new Koa();
  app.use(serve(serveOpts.root, serveOpts));
  app.use(ctx => send(ctx, 'index.html', serveOpts)); // File not found, serve index

  return new Promise((resolve, reject) => {
    const httpServer = app.listen(port, err => (err ? reject(err) : resolve(httpServer)));
  });
};
