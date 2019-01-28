const File = require('./file');

class Asset extends File {
  get isAsset() {
    return true;
  }

  static isAsset(item) {
    return item instanceof Asset;
  }
}

module.exports = Asset;
