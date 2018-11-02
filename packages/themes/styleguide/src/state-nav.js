const { sep, dirname, join } = require('path');
const { get, flatten, sortBy, uniqBy, cloneDeep } = require('lodash');
const Collection = require('@fractalite/support/collection');
const { titlize } = require('@fractalite/support/utils');

module.exports = function(state, { utils, config }) {
  const { pages, components } = state;

  let pageNodes = flatten(
    pages.map(page => {
      const { label, order = 1000, relative, url, hidden } = page;
      const nodes = makeNodes(relative);
      Object.assign(nodes[nodes.length - 1], { label, order, url, hidden, type: 'page' });
      return nodes;
    })
  );
  pageNodes = uniqBy(pageNodes, 'path');

  let componentNodes = flatten(
    components.map(component => {
      const { label, order = 1000, relative, hidden } = component;
      const nodes = makeNodes(relative);
      Object.assign(nodes[nodes.length - 1], { label, order, hidden });
      for (const variant of component.variants) {
        const { name, label, order = 1000, url, hidden } = variant;
        const path = join(relative, name);
        nodes.push({
          name,
          hidden,
          label,
          order,
          url,
          path,
          hidden,
          depth: path.split(sep).length,
          type: 'variant'
        });
      }
      return nodes;
    })
  );
  componentNodes = uniqBy(componentNodes, 'path');

  return toTree(pageNodes);
};

function makeNodes(path) {
  const nodes = [];
  let tmpPath;
  const segments = [];
  for (const segment of path.split(sep)) {
    const [, order, name] = segment.match(/^(?:(\d+)-)?(.*)$/);
    tmpPath = tmpPath ? `${tmpPath}/${segment}` : segment;
    segments.push(name);
    nodes.push({
      name,
      order,
      label: titlize(name),
      path: tmpPath,
      depth: segments.length,
      type: 'directory'
    });
  }
  return nodes;
}

function toTree(nodes) {
  nodes = sortBy(nodes, ['order', 'label']);
  const tree = new Collection(nodes.filter(node => node.depth === 1));

  for (const node of tree) {
    if (node.type === 'directory') {
      node.children = getChildren(node, nodes);
      const visibleChildren = node.children.filter(node => !node.hidden);
      if (visibleChildren.length === 0) {
        node.hidden = true;
      }
    }
  }

  return tree;

  function getChildren(parent, nodes) {
    const children = nodes.filter(node => {
      return node.depth === parent.depth + 1 && dirname(node.path) === parent.path;
    });
    for (const child of children) {
      if (child.type === 'directory') {
        child.children = getChildren(child, nodes);
        const visibleChildren = child.children.filter(node => !node.hidden);
        if (visibleChildren.length === 0) {
          child.hidden = true;
        }
      }
    }
    return new Collection(children);
  }
}
