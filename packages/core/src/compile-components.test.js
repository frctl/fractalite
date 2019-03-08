const { resolve, join, basename } = require('path');
const { readdirSync, statSync } = require('fs');
const readFiles = require('./read');
const readComponents = require('./compile-components');
const Component = require('./entities/component');

const componentsPath = resolve(__dirname, '../test/fixtures/components');

it('Matches all the components in a directory', async () => {
  const files = await readFiles(componentsPath);
  const components = await readComponents(files);
  const componentDirs = recursiveReadDirs(componentsPath).filter(path => basename(path).startsWith('@'));
  expect(components.length).toEqual(componentDirs.length);
});

it('Retuns an array of Component instances', async () => {
  const files = await readFiles(componentsPath);
  for (const component of await readComponents(files, componentsPath)) {
    expect(component).toBeInstanceOf(Component);
  }
});

it('Supports supplying custom matchers', async () => {
  const matcher = (dir, children) => {
    return dir.name.startsWith('component-') && children.length > 0;
  };
  const files = await readFiles(resolve(__dirname, '../test/fixtures/custom-matcher'));
  const components = await readComponents(files, { matcher });
  expect(components.length).toEqual(1);
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
