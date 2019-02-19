const { dirname } = require('path');
const { isFunction, isPlainObject, flatMap, uniqBy, orderBy } = require('lodash');
const { titlize } = require('@frctl/fractalite-support/utils');
const { isComponent, isFile } = require('@frctl/fractalite-core/helpers');

module.exports = function(app, adapter, opts = {}) {
  if (Array.isArray(opts) || isFunction(opts)) {
    opts = { items: opts };
  }
  const items = opts.items || defaultGenerator;

  app.addRoute('api.navigation', '/api/navigation.json', ctx => {
    const { pages, components, assets } = ctx.state;
    ctx.body = {
      items: buildNav(items, { pages, components, assets }, app)
    };
  });

  app.compiler.use(({ components }) => {
    components.forEach(component => {
      component.position = component.config.position || 1000;
    });
  });
};

function defaultGenerator({ components, pages }, toTree) {
  return [
    toTree(pages),
    {
      label: 'Components',
      children: toTree(components)
    }
  ];
}

function buildNav(items, entities, app) {
  items = isFunction(items) ? items(entities, toTree) : items;
  return expandValues(items, app);
}

function expandValues(items, app) {
  return flatMap(items, item => {
    if (Array.isArray(item)) {
      return expandValues(item, app);
    }

    if (item.entity) {
      item = item.entity;
    }

    if (isComponent(item)) {
      return {
        label: item.label,
        children: item.contexts.map(context => {
          return {
            label: context.label,
            url: context.url
          };
        })
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
      children: item.children ? expandValues(item.children, app) : null
    };

    if (isPlainObject(item.url)) {
      const { route, props } = item.url;
      item.url = app.url(route, props);
    }

    return item;
  });
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

  return nodes.filter(node => node.depth === 1).map(node => {
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
