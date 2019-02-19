const { assign } = require('@frctl/fractalite-support/utils');

class Entity {
  constructor(props) {
    assign(this, props);
  }

  set handle(str) {
    this._handle = str;
  }

  get handle() {
    return this._handle;
  }

  toString() {
    return this.handle;
  }

  static isEntity(item) {
    return item instanceof Entity;
  }
}

module.exports = Entity;
