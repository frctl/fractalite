const createState = require('./state');

test('exports a function', () => {
  expect(createState).toBeInstanceOf(Function);
});

test('sets initial state from initialiser object', () => {
  const components = [{ name: 'foo' }];
  const state = createState({ components });
  expect(state.components).toBe(components);
});

describe('state', () => {
  test('has components property', () => {
    const state = createState();
    expect(state).toHaveProperty('components');
    expect(state.components).toBeInstanceOf(Array);
  });

  test('has files property', () => {
    const state = createState();
    expect(state).toHaveProperty('files');
    expect(state.files).toBeInstanceOf(Array);
  });

  test('can be updated', () => {
    const state = createState();
    expect(state.components).toHaveLength(0);
    const components = [{ name: 'foo' }];
    state.update({ components });
    expect(state.components).toBe(components);
  });

  test('can have additional properties set', () => {
    const state = createState();
    const pages = [{ name: 'foo' }];
    state.update({ pages });
    expect(state).toHaveProperty('pages');
    expect(state.pages).toBe(pages);
  });
});
