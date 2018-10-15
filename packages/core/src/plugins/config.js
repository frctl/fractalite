const { get } = require('lodash');
const deepFreeze = require('deep-freeze');
const rewire = require('enhanced-require');
const pupa = require('pupa');
const { defaultsDeep } = require('@fractalite/support/utils');

module.exports = function config(opts = {}) {
  return function(components) {
    const load = rewire(module, {
      recursive: true,
      resolve: {
        alias: opts.resolve || {}
      }
    });

    const cosmiconfig = load('cosmiconfig');

    return Promise.all(
      components.map(async component => {
        const { path, name } = component.root;
        const finderOpts = opts.finder || {};
        const cosmiOpts = Object.assign({}, finderOpts, {
          stopDir: path,
          searchPlaces: get(finderOpts, 'searchPlaces', []).map(path => pupa(path, component.root))
        });
        const finder = cosmiconfig(name, cosmiOpts);
        const searchResult = await finder.search(path);
        let config = searchResult ? searchResult.config : {};
        if (!searchResult) {
          this.debug(`No config file found for component '${component.root.relative}'`);
        } else {
          component.configFile = component.files.find(file => file.path === searchResult.filepath);
          if (typeof config === 'function') {
            config = await config(component);
          }
        }
        component.config = deepFreeze(defaultsDeep(config, opts.default || {}));
        return component;
      })
    );
  };
};
