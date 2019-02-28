const { resolve, join, basename } = require('path');
const { readdirSync, statSync } = require('fs');
const readComponents = require('./read-components');
const Component = require('./entities/component');

const componentsPath = resolve(__dirname, '../test/fixtures/components');

it('Matches all the components in a directory', async () => {
  const components = await readComponents(componentsPath);
  const componentDirs = recursiveReadDirs(componentsPath).filter(path => basename(path).startsWith('@'));
  expect(components.length).toEqual(componentDirs.length);
});

it('Retuns an array of Component instances', async () => {
  for (const component of await readComponents(componentsPath)) {
    expect(component).toBeInstanceOf(Component);
  }
});

function recursiveReadDirs(path) {
  let list = [];
  const files = readdirSync(path);
  if (!files.length) {
    return list;
  }
  files.forEach(function(file) {
    const filePath = join(path, file);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      const children = readdirSync(filePath);
      if (children.length) {
        list.push(filePath);
        list = list.concat(recursiveReadDirs(filePath));
      }
    }
  });
  return list;
}
