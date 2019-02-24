const { resolve } = require('path');
const createCompiler = require('../.');
const standardConfig = require('./fixtures/components/@standard/standard.config');

it('Reads JS config files', async () => {
  const compiler = createCompiler(resolve(__dirname, './fixtures/components'));
  const { components } = await compiler.run();
  const standard = components.find(c => c.name === 'standard');
  expect(standard.config).toEqual(standardConfig);
});
