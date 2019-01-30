const { isFunction, isPlainObject } = require('lodash');
const { titlize } = require('@fractalite/support/utils');
const { Variant, Component, File } = require('@fractalite/core');

module.exports = function(opts = {}) {
  return function navigationPlugin(app) {
    const nav = {};
    const items = opts.items || [];

    Object.defineProperty(nav, 'items', {
      get() {
        let tree = isFunction(items) ? items(app.api) : items;
        tree = expandValues(tree, app.api);
        return tree;
      }
    });

    app.addViewGlobal('nav', nav);

    function expandValues(items, api) {
      return items.map(item => {
        if (item.node) {
          item = item.node;
        }
        if (Component.isComponent(item)) {
          return {
            label: item.label,
            children: expandValues(item.variants)
          };
        }

        if (Variant.isVariant(item)) {
          return {
            label: item.label,
            url: item.url
          };
        }

        if (File.isFile(item)) {
          return {
            label: item.handle,
            url: item.url
          };
        }

        item = {
          label: item.label || item.handle || titlize(item.name),
          url: item.url,
          children: item.children ? expandValues(item.children, api) : null
        };

        if (isPlainObject(item.url)) {
          const { route, props } = item.url;
          item.url = app.url(route, props);
        }

        return item;
      });
    }
  };
};
