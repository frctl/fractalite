const { sep, dirname } = require('path');
const { get, flatten, sortBy, uniqBy } = require('lodash');
const Collection = require('@fractalite/support/collection');
const { titlize } = require('@fractalite/support/utils');

module.exports = function tree(items, [opts = {}]) {
  const key = opts.key || 'relative';
  const sortKeys = opts.sort || ['order', 'label'];

  items = Collection.isCollection(items) ? items.toArray() : items;

  let nodes = flatten(
    items.map(item => {
      const paths = [];
      let path;
      const segments = [];
      for (const segment of get(item, key).split(sep)) {
        const [str, order, name] = segment.match(/^(?:(\d+)-)?(.*)$/);
        path = path ? `${path}/${segment}` : segment;
        segments.push(name);
        paths.push({
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
    node.order = node.content && node.content.order ? node.content.order : node.order;
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
};
