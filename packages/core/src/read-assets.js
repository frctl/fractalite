const read = require('./read');
const Asset = require('./entities/asset');

module.exports = async function(src, opts = {}) {
  const files = await read(src, opts);
  return files.filter(file => !file.stats.isDirectory()).map(file => new Asset(file));
};
