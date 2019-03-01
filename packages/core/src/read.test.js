const { resolve, join, basename } = require('path');
const { readdirSync, statSync } = require('fs');
const readFiles = require('./read');
const File = require('./entities/file');

const componentsPath = resolve(__dirname, '../test/fixtures/components');
const withIgnoredPath = resolve(__dirname, '../test/fixtures/ignored');

it('Recursively reads all the files in a directory', async () => {
  const files = await readFiles(componentsPath);
  const paths = readRecursive(componentsPath);
  expect(files.length).toEqual(paths.length);
});

it('Ignores node_modules directories', async () => {
  const files = await readFiles(withIgnoredPath);
  expect(files.filter(file => file.relative.includes('node_modules')).length).toEqual(0);
});

it('Retuns an array of File instances', async () => {
  for (const file of await readFiles(componentsPath)) {
    expect(file).toBeInstanceOf(File);
  }
});

function readRecursive(path, opts = {}) {
  let list = [];
  const files = readdirSync(path);
  if (!files.length) {
    return list;
  }
  files.forEach(function(file) {
    const filePath = join(path, file);
    const stats = statSync(filePath);
    if (basename(filePath) !== 'node_modules') {
      if (stats.isDirectory()) {
        list.push(filePath);
        list = list.concat(readRecursive(filePath));
      } else {
        list.push(filePath);
      }
    }
  });
  return list;
}
