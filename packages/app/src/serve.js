const Koa = require('koa');
const serve = require('koa-static');
const { normalizePath } = require('@frctl/fractalite-support/utils');

module.exports = async function(dir, port = 0) {
  dir = normalizePath(dir);
  const app = new Koa();
  app.use(serve(dir));

  return await new Promise((resolve, reject) => {
    const httpServer = app.listen(port, err => (err ? reject(err) : resolve(httpServer)));
  });
};
