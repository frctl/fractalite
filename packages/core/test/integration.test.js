const { resolve } = require('path');
const createCompiler = require('../.');
const standardConfig = require('./fixtures/components/@standard/standard.config');

it('Reads JS config files', async () => {
  const compiler = createCompiler(resolve(__dirname, './fixtures/components'));
  const { state } = await compiler.run();
  const standard = state.components.find(c => c.name === 'standard');
  expect(standard.config).toEqual(standardConfig);
});
