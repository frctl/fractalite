const { omit } = require('lodash');
const Entity = require('./entity');

class Variant extends Entity {
  constructor(props) {
    if (!props.handle) {
      throw new Error(`Variants must have a 'handle' property defined`);
    }

    super(omit(props, 'handle'));

    const handleGenerator =
      typeof props.handle === 'function'
        ? props.handle
        : function() {
            return props.handle;
          };

    Object.defineProperty(this, 'handle', {
      get: handleGenerator.bind(this),
      set(value) {
        this._handle = value;
      },
      enumerable: true
    });
  }

  get isVariant() {
    return true;
  }

  static isVariant(item) {
    return item instanceof Variant;
  }
}

module.exports = Variant;
