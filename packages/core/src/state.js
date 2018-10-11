class State {
  constructor(initialState = {}) {
    const { components, files } = initialState;
    this._components = components || [];
    this._files = files || [];
  }

  get components() {
    return this._components;
  }

  get files() {
    return this._files;
  }

  get views() {
    return this._components
      .map(component => {
        return component.view ? Object.assign({ name: component.name }, component.view) : null;
      })
      .filter(view => view);
  }

  update(newState = {}) {
    const { components, files } = newState;
    if (components) {
      this._components = components;
    }
    if (files) {
      this._files = files;
    }
  }

  toJSON() {
    return {
      components: this.components,
      files: this.files
    };
  }
}

module.exports = State;
