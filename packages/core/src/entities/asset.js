const File = require('./file');

class Asset extends File {
  get isAsset() {
    return true;
  }

  static isAsset(item) {
    return item instanceof Asset;
  }

  get treePath() {
    return this.relative;
  }
}

module.exports = Asset;
