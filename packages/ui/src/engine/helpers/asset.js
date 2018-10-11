module.exports = function url([path, source], { utils, assets }) {
  return utils.url(assets.getMountedPath(path, source));
};
