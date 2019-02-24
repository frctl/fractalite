const createCompiler = require('../.');

describe('Compiler middleware', () => {
  it('Is called when running the compiler', async () => {
    let called = false;
    const mw = () => {
      called = true;
    };
    const compiler = createCompiler();
    compiler.use(mw);
    await compiler.run();
    expect(called).toBe(true);
  });
});
