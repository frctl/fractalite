const Entity = require('./entity');

class Component extends Entity {
  constructor(props) {
    if (!props.name) {
      throw new Error(`Components must have a 'name' property defined`);
    }
    super(props);
  }

  get handle() {
    return this._handle || this.name;
  }

  get treePath() {
    return this.relative;
  }

  get isComponent() {
    return true;
  }

  static isComponent(item) {
    return item instanceof Component;
  }
}

module.exports = Component;
