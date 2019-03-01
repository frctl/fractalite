const { basename } = require('path');
const { isPlainObject, isString } = require('lodash');
const { normalizePath } = require('@frctl/fractalite-support/utils');

module.exports = function(app) {
  return function resolveAsset(asset) {
    let path;
    let url;
    if (isString(asset)) {
      if (asset.startsWith('//') || asset.includes('://')) {
        url = asset; // Full URL, use as-is
      } else if (asset.includes(':')) {
        // Reference a file in a static directory
        url = app.resourceUrl(asset);
      } else {
        // Assume it's a path
        path = asset;
      }
    } else if (isPlainObject(asset)) {
      path = asset.path;
      url = asset.url;
      if (!path && !url) {
        throw new Error(`Cannot add asset - either a .url or a .path property must be defined`);
      }
    } else {
      throw new Error(`Cannot add asset - either a string or an object description is required`);
    }
    path = path ? normalizePath(path) : path;
    if (!url) {
      url = `/${basename(path)}`;
    }
    return { path, url };
  };
};
