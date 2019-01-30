const { readFile } = require('fs-extra');
const Entity = require('./entity');

class File extends Entity {
  constructor(props) {
    // TODO: better validation
    if (!props.relative) {
      throw new Error(`Files must have a '.relative' property defined`);
    }
    if (!props.path) {
      throw new Error(`Files must have a '.path' property defined`);
    }
    super(props);
  }

  get handle() {
    return this._handle || this.relative;
  }

  get treePath() {
    return this.relative;
  }

  get isFile() {
    return true;
  }

  setContents(contents) {
    this._contents = contents;
  }

  getContents() {
    return this._contents || readFile(this.path, 'utf-8');
  }

  static isFile(item) {
    return item instanceof File;
  }
}

module.exports = File;
