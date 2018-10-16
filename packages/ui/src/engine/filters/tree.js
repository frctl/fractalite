const { sep, dirname } = require('path');
const { get, flatten, sortBy, uniqBy } = require('lodash');
const Collection = require('@fractalite/support/collection');
const { titlize } = require('@fractalite/support/utils');

module.exports = function tree(items, [opts = {}]) {
  const key = opts.key || 'relative';
  const sort = opts.sort || ['position', 'label'];

  items = Collection.isCollection(items) ? items.toArray() : items;

  // 1. generate all required paths from items
  let nodes = flatten(
    items.map(item => {
      const paths = [];
      let path;
      const segments = [];
      for (const segment of get(item, key).split(sep)) {
        path = path ? `${path}/${segment}` : segment;
        segments.push(segment);
        paths.push({
          label: titlize(segment),
          path,
          segments: segments.slice(0),
          depth: segments.length
        });
      }
      return paths;
    })
  );
  nodes = sortBy(uniqBy(nodes, 'path'), sort);
  for (const node of nodes) {
    node.content = items.find(item => item[key] === node.path);
  }

  const tree = nodes.filter(node => node.depth === 1);
  for (const node of tree) {
    if (!node.content) {
      node.children = getChildren(node, nodes);
    }
  }

  return tree;
};

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
