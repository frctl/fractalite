const { get, isFunction } = require('lodash');
const deepFreeze = require('deep-freeze');
const rewire = require('enhanced-require');
const pupa = require('pupa');
const { map } = require('asyncro');
const { defaultsDeep } = require('@fractalite/support/utils');

module.exports = function(opts = {}) {
  opts = defaultsDeep(opts, {
    defaults: {},
    finder: {
      searchPlaces: [
        'package.json',
        '{name}.config.js',
        '{name}.config.json',
        '{name}.config.yml',
        'config.js',
        'config.json',
        'config.yml'
      ],
      packageProp: 'fractal'
    },
    resolve: {
      '~': process.cwd()
    },
    process: config => config
  });

  return async function componentConfig(ctx) {
    const load = rewire(module, {
      recursive: true,
      resolve: {
        alias: opts.resolve || {}
      }
    });
    const cosmiconfig = load('cosmiconfig');

    await map(ctx.components, async component => {
      const { path, name } = component.root;
      const finderOpts = opts.finder || {};
      const cosmiOpts = Object.assign({}, finderOpts, {
        stopDir: path,
        searchPlaces: get(finderOpts, 'searchPlaces', []).map(path => pupa(path, component.root))
      });
      const finder = cosmiconfig(name, cosmiOpts);
      const searchResult = await finder.search(path);
      let config = searchResult ? searchResult.config : {};
      if (searchResult) {
        component.configFile = component.files.find(file => file.path === searchResult.filepath);
        if (isFunction(config)) {
          config = await config(ctx);
        }
      } else {
        // This.debug(`No config file found for component '${component.root.relative}'`);
      }
      config = defaultsDeep(config, opts.defaults || {});
      component.config = deepFreeze(opts.process(config));
      return component;
    });
  };
};
