const { dirname } = require('path');
const { merge, isFunction, isPlainObject, flatMap, uniqBy, orderBy, compact } = require('lodash');
const { titlize } = require('@frctl/fractalite-support/utils');
const { isComponent, isFile } = require('@frctl/fractalite-core/helpers');

module.exports = function(app, compiler, renderer, opts = {}) {
  const defaults = {
    items: defaultGenerator,
    scenarios: true
  };

  if (Array.isArray(opts) || isFunction(opts)) {
    opts = { items: opts };
  }

  opts = merge(defaults, opts);

  app.addRoute('api.navigation', '/api/navigation.json', ctx => {
    ctx.body = {
      items: buildNav(opts.items, ctx.state)
    };
  });

  app.addBuilder((state, { request }) => request({ name: 'api.navigation' }));

  compiler.use(components => {
    components.forEach(component => {
      component.position = component.config.position || 1000;
    });
  });

  function buildNav(items, state) {
    items = isFunction(items) ? items(state, toTree) : items;
    return expandValues(items);
  }

  function expandValues(items) {
    return flatMap(compact(items), item => {
      if (Array.isArray(item)) {
        return expandValues(item);
      }

      if (item.entity) {
        item = item.entity;
      }

      if (isComponent(item)) {
        if (opts.scenarios) {
          return {
            label: item.label,
            children: item.scenarios.map(scenario => {
              return {
                label: scenario.label,
                url: scenario.url
              };
            })
          };
        }
        return {
          label: item.label,
          url: item.url
        };
      }

      if (isFile(item)) {
        return {
          label: item.handle,
          url: item.url
        };
      }

      item = {
        label: item.label || item.handle,
        url: item.url,
        children: item.children ? expandValues(item.children) : null
      };

      if (isPlainObject(item.url)) {
        const { route, props } = item.url;
        item.url = app.url(route, props);
      }

      return item;
    });
  }
};

function defaultGenerator({ components, pages }, toTree) {
  return [
    toTree(pages),
    components.length
      ? {
          label: 'Components',
          children: toTree(components)
        }
      : null
  ];
}

function toTree(items, pathProp) {
  let nodes = flatMap(items, item => {
    const path = item.treePath || item[pathProp] || '';
    const nodes = makeNodes(path.trim('/'));
    const leaf = nodes[nodes.length - 1];
    leaf.entity = item;
    leaf.position = item.position || leaf.position;
    return nodes;
  });
  nodes = orderBy(uniqBy(nodes, 'path'), ['position'], ['asc']);

  return nodes
    .filter(node => node.depth === 1)
    .map(node => {
      node.children = getChildNodes(node, nodes);
      return node;
    });
}

function getChildNodes(parent, nodes) {
  const children = nodes.filter(node => {
    return node.depth === parent.depth + 1 && dirname(node.path) === parent.path;
  });
  for (const child of children) {
    child.children = getChildNodes(child, nodes);
  }
  return children;
}

function makeNodes(path = '') {
  const nodes = [];
  let tmpPath;
  const segments = [];
  for (const segment of path.split('/')) {
    const [, position = 10000, name] = segment.match(/^(?:(\d+)-)?(.*)$/);
    tmpPath = tmpPath ? `${tmpPath}/${segment}` : segment;
    segments.push(name);
    nodes.push({
      name,
      position: parseInt(position, 10),
      label: titlize(name),
      path: tmpPath,
      depth: segments.length
    });
  }
  return nodes;
}
