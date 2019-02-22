const { join, relative } = require('path');
const { flatten } = require('lodash');
const serve = require('koa-static');
const mount = require('koa-mount');
const compose = require('koa-compose');
const globby = require('globby');
const { normalizePath } = require('@frctl/fractalite-support/utils');

module.exports = function(opts = {}) {
  const sources = [];

  function routes() {
    return compose(
      sources.map(source => {
        const server = serve(source.path);
        return source.mount ? mount(source.mount, server) : server;
      })
    );
  }

  async function list() {
    // TODO: list all assets
    return flatten(
      await Promise.all(
        sources.map(async source => {
          const files = await globby([source.path, '!**/node_modules'], {
            onlyFiles: true,
            gitignore: false
          });
          return files.map(file => {
            const relPath = relative(source.path, file);
            return {
              path: file,
              url: url(`${source.name}:${relPath}`)
            };
          });
        })
      )
    );
  }

  function add(name, path, mount) {
    sources.push({ name, path: normalizePath(path), mount });
  }

  function url(path) {
    if (path.indexOf('://') !== -1 || path.startsWith('/')) {
      return path; // ignore external or absolute paths
    }
    const [sourceName, relativePath] = path.split(':');
    if (relativePath) {
      const source = sources.find(src => src.name === sourceName);
      if (!source) {
        throw new Error(`'${sourceName}' is not a recognised static asset source`);
      }
      return join(source.mount || '/', relativePath);
    }
    return path;
  }

  return { add, routes, url, list };
};
