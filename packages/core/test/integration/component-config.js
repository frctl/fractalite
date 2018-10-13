const { resolve } = require('path');
const { expect } = require('../../../../test/support/helpers');
const Fractal = require('../../.');

const app = new Fractal({
  src: resolve(__dirname, '../fixtures/components/config'),
  opts: {
    config: {
      resolve: {
        '%': resolve(__dirname, '../fixtures/support')
      }
    }
  }
});

const resolvedFromCwd = require('../fixtures/support/data');
const resolvedFromCustom = require('../fixtures/support/data2');

describe('Configuration loading and parsing', () => {
  let components = [];

  function getComponent(name) {
    return components.find(c => c.name === name);
  }

  before(async () => {
    const state = await app.init();
    components = state.components;
  });

  describe('JS module config files', () => {
    describe('that export an object', () => {
      it('can be loaded', () => {
        expect(getComponent('js').config.isLoaded).to.be.true;
      });
    });

    describe('that export a function', () => {
      it('can be loaded', () => {
        expect(getComponent('js-fn').config.isLoaded).to.be.true;
      });

      it('can be async', () => {
        expect(getComponent('async-js-fn').config.isLoaded).to.be.true;
      });

      it('are passed the raw component object as their first argument', () => {
        const { component } = getComponent('js-fn').config;
        expect(component).to.be.an('object');
        expect(component.name).to.equal('js-fn');
        expect(component.config).to.be.undefined;
        expect(component.files).to.be.an('array');
      });
    });

    it('can require dependencies from the cwd using aliases', () => {
      expect(getComponent('js').config.resolvedFromCwd).to.eql(resolvedFromCwd);
    });

    it('can require dependencies from custom locations using aliases', () => {
      expect(getComponent('js').config.resolvedFromCustom).to.eql(resolvedFromCustom);
    });
  });

  describe('package.json config files', () => {
    it('can be loaded', () => {
      expect(getComponent('pkg').config.isLoaded).to.be.true;
    });
  });

  describe('YAML config files', () => {
    it('can be loaded', () => {
      expect(getComponent('yml').config.isLoaded).to.be.true;
    });
  });

  describe('JSON config files', () => {
    it('can be loaded', () => {
      expect(getComponent('json').config.isLoaded).to.be.true;
    });
  });
});
