const { dirname } = require('path');
const { merge, isFunction, isPlainObject, flatMap, uniqBy, orderBy, compact } = require('lodash');
const { titlize, slugify } = require('@frctl/fractalite-support/utils');
const { isComponent, isFile } = require('@frctl/fractalite-core/helpers');

module.exports = function(app, compiler, renderer, opts = {}) {
  const defaults = {
    label: str => str,
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

  function generateLabel(str, target) {
    return isFunction(opts.label) ? opts.label(str, target) : str;
  }

  function buildNav(items, state) {
    items = isFunction(items) ? items(state, toTree) : items;
    return expandValues(items);
  }

  function expandValues(items, level = 0) {
    return flatMap(compact(items), item => {
      if (Array.isArray(item)) {
        return expandValues(item);
      }

      if (item.entity) {
        item = item.entity;
      }

      if (isComponent(item)) {
        const entry = {
          id: `component-${item.name}`,
          type: 'component',
          target: item
        };
        if (opts.scenarios) {
          entry.children = item.scenarios.map(scenario => {
            const entry = {
              id: `scenario-${item.name}-${scenario.name}`,
              type: 'scenario',
              target: scenario,
              url: scenario.url
            };
            entry.label = generateLabel(scenario.label, entry);
            return entry;
          });
        } else {
          entry.url = item.url;
        }
        entry.label = generateLabel(item.label, entry);
        return entry;
      }

      if (isFile(item)) {
        const entry = {
          id: item.handle,
          type: 'file',
          url: entry.url
        };
        entry.label = generateLabel(item.handle, item);
        return entry;
      }

      const entry = {
        target: item,
        url: item.url,
        children: item.children ? expandValues(item.children, level + 1) : null
      };

      if (isPlainObject(item.url)) {
        const { route, props } = item.url;
        item.url = app.url(route, props);
      }

      entry.id = item.id || item.url || item.path || `level-${level}-${item.label}`;
      entry.label = generateLabel(item.label || item.handle, entry);

      return entry;
    }).map(entry => {
      entry.id = slugify(entry.id);
      return entry;
    });
  }
};

function defaultGenerator({ components, pages }, toTree) {
  return [
    toTree(pages),
    components.length === 0
      ? null
      : {
          label: 'Components',
          children: toTree(components)
        }
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
