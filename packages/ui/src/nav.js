const { sep, dirname } = require('path');
const { get, flatten, sortBy, uniqBy, cloneDeep } = require('lodash');
const Collection = require('@fractalite/support/collection');
const { titlize } = require('@fractalite/support/utils');

module.exports = function(state, { utils, config }) {
  const pages = state.pages.map(page => {
    page = cloneDeep(page);
    page.url = utils.route('page', { urlPath: page.urlPath });
    return page;
  });

  const components = state.components.map(component => {
    component = cloneDeep(component);
    component.url = utils.route('component', { component: component.name });
    return component;
  });

  const pageTree = tree(pages, { type: 'page' });
  const componentTree = tree(components, { type: 'component' });

  if (pageTree.length === 0) {
    pageTree.push({
      label: config.pages.indexLabel || 'Overview',
      url: utils.url('/'),
      type: 'page'
    });
  }

  let hasComponentsInjected = false;

  for (const node of pageTree) {
    if (node.content && node.content.name === 'components') {
      Object.assign(node, node.content);
      node.children = componentTree;
      hasComponentsInjected = true;
    }
  }

  if (!hasComponentsInjected) {
    pageTree.push({
      label: config.pages.indexLabel || 'Overview',
      type: 'directory',
      children: componentTree
    });
  }

  return pageTree;
};

function tree(items, opts = {}) {
  const key = opts.key || 'relative';
  const sortKeys = opts.sort || ['order', 'label'];

  items = Collection.isCollection(items) ? items.toArray() : items;

  let nodes = flatten(
    items.map(item => {
      const paths = [];
      let path;
      const segments = [];
      for (const segment of get(item, key).split(sep)) {
        const [, order, name] = segment.match(/^(?:(\d+)-)?(.*)$/);
        path = path ? `${path}/${segment}` : segment;
        segments.push(name);
        paths.push({
          name,
          label: titlize(name),
          path,
          order,
          segments: segments.slice(0),
          depth: segments.length
        });
      }
      return paths;
    })
  );
  nodes = uniqBy(nodes, 'path');
  for (const node of nodes) {
    node.content = items.find(item => item[key] === node.path);
    if (node.content) {
      node.url = node.content.url;
      node.label = node.content.label || node.label;
      node.order = node.content.order || node.order;
      node.type = opts.type;
    }
    node.order = node.order || 1000;
    node.type = node.type || 'directory';
  }
  nodes = sortBy(nodes, sortKeys);

  const tree = nodes.filter(node => node.depth === 1);
  for (const node of tree) {
    if (!node.content) {
      node.children = getChildren(node, nodes);
    }
  }

  return tree;

  function getChildren(parent, nodes) {
    const children = nodes.filter(node => {
      return node.depth === parent.depth + 1 && dirname(node.path) === parent.path;
    });
    for (const child of children) {
      if (!child.content) {
        child.children = getChildren(child, nodes);
      }
    }
    return children;
  }
}
