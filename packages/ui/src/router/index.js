const nanoid = require('nanoid');
const UrlPattern = require('url-pattern');
const { flatten, compact, uniqBy, cloneDeep } = require('lodash');
const handlers = require('./handlers');
const generators = require('./generators');

class Router {
  constructor(routes) {
    this._routes = cloneDeep(
      uniqBy(routes, 'name').map(config => {
        const route = Object.assign({}, config, {
          name: config.name || nanoid(),
          matcher: config.url ? new UrlPattern(config.url) : null
        });

        let { handler } = config;
        let handlerName;
        if (!handler && route.view) {
          handler = ({ engine }) => engine.render(route.view);
        }
        if (typeof handler === 'string') {
          if (!handlers[handler]) {
            throw new Error(`The route handler '${handler}' was not recognised`);
          }
          handlerName = handler;
          handler = handlers[handler](route);
        }
        route.handler = handler;

        let { generator } = config;
        if (!generator && handlerName) {
          generator = handlerName;
        }
        if (typeof generator === 'string') {
          if (!generators[generator]) {
            throw new Error(`The route generator '${generator}' was not recognised`);
          }
          generator = generators[generator];
        }
        route.generator = generator;

        return route;
      })
    );
  }

  urlFor(name, params) {
    for (const route of this._routes) {
      if (route.name === name) {
        return route.matcher.stringify(params);
      }
    }
    throw new Error(`Could not find route with name '${name}'`);
  }

  decorate(fn) {
    this._routes = this._routes.map(route => fn(route));
    return this;
  }

  async handle(url) {
    for (const route of this._routes) {
      if (!route.matcher) {
        continue;
      }
      const params = route.matcher.match(url);
      if (params !== null) {
        // eslint-disable-next-line no-await-in-loop
        const result = await route.handler({ url, params });
        if (result !== null) {
          return result;
        }
      }
    }
    const err = new Error('Page not found');
    err.status = 404;
    throw err;
  }

  async handleError(url, err) {
    let route;
    if (err.status === 404) {
      route = this._routes.find(route => route.name === '404');
    }
    route = route || this._routes.find(route => route.name === 'error');
    if (route) {
      try {
        return await route.handler({ url, error: err });
      } catch (err2) {
        return `Error: ${err2.message}`;
      }
    }
    err.url = url;
    throw err;
  }

  async generate(state = {}) {
    const pages = this._routes.map(async route => {
      if (route.generator) {
        const targets = await route.generator(state);
        return Promise.all(
          targets.map(async params => {
            const url = route.matcher.stringify(params);
            return {
              url,
              contents: await route.handler({ url, params })
            };
          })
        );
      }
      if (route.url) {
        const url = route.matcher.stringify({});
        return {
          url,
          contents: await route.handler({ url })
        };
      }
    });
    return compact(flatten(await Promise.all(pages)));
  }
}

module.exports = Router;
