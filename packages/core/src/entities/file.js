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

  get size() {
    const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const size = this.stats.size;
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const displaySize = (size / Math.pow(1024, i)).toFixed(2) * 1;
    return `${displaySize} ${suffixes[i]}`;
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
