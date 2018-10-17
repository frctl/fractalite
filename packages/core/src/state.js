class State {
  constructor(stores = {}) {
    this._stores = {};
    this._getters = {};
    Object.keys(stores).forEach(store => this.addStore(store, stores[store]));
  }

  addStore(key, initialValue = []) {
    if (this._stores[key]) {
      return this;
    }
    this._stores[key] = initialValue;
    Object.defineProperty(this, key, {
      get() {
        return this._stores[key];
      },
      enumerable: true
    });
    return this;
  }

  addGetter(key, handler) {
    if (this._getters[key]) {
      return this;
    }
    this._getters[key] = handler;
    Object.defineProperty(this, key, {
      get() {
        return handler(this._stores);
      },
      enumerable: true
    });
    return this;
  }

  updateStore(key, value) {
    this._stores[key] = value;
    return this;
  }

  update(obj) {
    Object.keys(obj).forEach(key => {
      this.updateStore(key, obj[key]);
    });
    return this;
  }

  toJSON() {
    const obj = Object.assign({}, this._stores);
    Object.keys(this._getters).forEach(key => {
      obj[key] = this[key];
    });
    return obj;
  }
}

module.exports = State;
