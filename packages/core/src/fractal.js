const Compiler = require('@fractalite/compiler');
const { isString } = require('lodash');
const { toArray, defaultsDeep } = require('@fractalite/support/utils');
const importCwd = require('import-cwd');
const defaults = require('../defaults');

class Fractal {
  constructor(config) {
    config = defaultsDeep(config, defaults);
    this._compiler = new Compiler('components', config);

    let [engine, engineOpts = {}] = toArray(config.engine || require('./noop-engine'));
    engine = isString(engine) ? importCwd(engine) : engine;
    this._render = engine(engineOpts);

    ['get', 'on', 'emit', 'use', 'watch'].forEach(method => {
      this[method] = (...args) => this._compiler[method](...args);
    });
  }

  compile() {
    return this._compiler.run();
  }

  async render(target, context, ...args) {
    const [opts = {}, components] = args.reverse();
    const render = this._render;
    components = components || (await this.compile());
    const views = components
      .map(c => {
        return c.view ? Object.assign({ name: c.name }, c.view) : null;
      })
      .filter(view => view);

    if (isString(target)) {
      return render(target, context, { components, views });
    }

    let component;
    let variant;
    if (target._component) {
      variant = target;
      component = components.find(c => c.name === target._component);
      if (!component) {
        throw new Error('Component not found');
      }
      context = opts.merge === false ? context : defaultsDeep(context, variant.props);
    } else {
      component = target;
    }

    const { view } = component;
    if (!view) {
      throw new Error('Cannot render components that do not have a view');
    }

    return render(view.contents, context, { components, views, component, variant });
  }
}

module.exports = Fractal;
