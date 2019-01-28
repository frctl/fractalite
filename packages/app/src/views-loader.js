const { extname } = require('path');
const { FileSystemLoader } = require('nunjucks');

class ViewLoader extends FileSystemLoader {
  getSource(name) {
    if (!extname(name)) {
      name += '.njk';
    }
    return super.getSource(name);
  }
}

module.exports = ViewLoader;
