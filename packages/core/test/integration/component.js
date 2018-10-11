const { resolve, isAbsolute } = require('path');
const { cloneDeep } = require('lodash');
const globby = require('globby');
const { Stats } = require('fs');
const { expect } = require('../../../../test/support/helpers');
const Fractal = require('../../.');

const app = new Fractal({
  src: resolve(__dirname, '../fixtures/components/props')
});

function expectFileObject(item) {
  expect(item).to.be.an('object');
  expect(item.path).to.be.a('string');
  expect(item.stats).to.be.an.instanceOf(Stats);
}

describe('The component object', () => {
  let basic;
  let noProps;
  let components;

  before(async () => {
    const state = await app.init();
    components = state.components;
    basic = components.find(c => c.name === 'basic');
    noProps = components.find(c => c.name === 'no-props');
  });

  describe('.name property', () => {
    it('is a string', () => {
      expect(basic.name).to.be.a('string');
    });

    it('is based on the root folder name', () => {
      expect(basic.name).to.equal('basic');
      expect(noProps.name).to.equal('no-props');
    });

    it('can be overriden in the config', () => {
      const renamed = components.find(c => (c.name = 'renamed-in-config'));
      expect(renamed).to.not.be.undefined;
    });
  });

  describe('.label property', () => {
    it('is a string', () => {
      expect(basic.label).to.be.a('string');
    });

    it('uses the label config property if set', () => {
      expect(basic.label).to.equal('Basic Component');
    });

    it('has a label generated if no config prop is provided', () => {
      expect(noProps.label).to.equal('No Props');
    });
  });

  describe('.config property', () => {
    it('is an object', () => {
      expect(basic.config).to.be.an('object');
    });

    it('is immutable', () => {
      basic.config.foo = 'bar';
      expect(basic.config.foo).to.be.undefined;
    });
  });

  describe('.root property', () => {
    it('is a file object', () => {
      expectFileObject(basic.root);
    });
  });

  describe('.path property', () => {
    it('is the absolute path to the root directory', () => {
      expect(basic.path).to.equal(basic.root.path);
      expect(isAbsolute(basic.path)).to.be.true;
    });
  });

  describe('.relative property', () => {
    it('is the relative path to the root directory', () => {
      expect(basic.relative).to.equal(basic.root.relative);
      expect(isAbsolute(basic.relative)).to.be.false;
    });
  });

  describe('.files property', () => {
    it('is an array', () => {
      const component = components.find(c => c.name === 'files');
      expect(basic.files).to.be.an('array');
      expect(component.files).to.be.an('array');
    });

    it('contains entries for each file in the component', async () => {
      const component = components.find(c => c.name === 'files');
      const result = await globby(component.root.path, {
        filesOnly: true
      });
      expect(component.files.length).to.equal(result.length);
      for (const path of result) {
        expectFileObject(component.files.find(f => f.path === path));
      }
    });
  });

  describe('.variants property', () => {
    it('is an array', () => {
      expect(basic.variants).to.be.an('array');
    });

    it('always has at least one item', () => {
      expect(basic.variants).to.have.lengthOf.above(0);
      expect(noProps.variants).to.have.lengthOf.above(0);
    });
  });

  describe('.view property', () => {
    it('is an object', () => {
      expect(basic.view).to.be.an('object');
    });

    it('has the expected properties', () => {
      expect(basic.view.path).to.be.a('string');
      expect(basic.view.contents).to.be.a('string');
    });

    it('can be stringified', () => {
      expect(String(basic.view)).to.equal(basic.view.contents);
    });
  });
});
