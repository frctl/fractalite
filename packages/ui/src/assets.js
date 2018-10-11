const { join, relative, isAbsolute } = require('path');
const { uniqBy, isFunction, cloneDeep } = require('lodash');
const watch = require('glob-watcher');
const globBase = require('glob-base');
const { normalizePath } = require('@fractalite/support/utils');

class Assets {
  constructor(sources) {
    this._sources = cloneDeep(uniqBy(sources, 'name').filter(asset => asset.mount));
    resolveSrc(this._sources);
    this._watchers = null;
    this._watcherCallbacks = [];
  }

  get sources() {
    return this._sources;
  }

  getMountedPath(path, source) {
    const assetSource = this.sources.find(src => src.name === source);
    if (!assetSource) {
      throw new Error(`'${source}' is not a recognised static asset source`);
    }
    if (isAbsolute(path)) {
      path = relative(assetSource.src, path);
    }
    return join(assetSource.mount || '/', path);
  }

  watch(callback) {
    if (isFunction(callback)) {
      this._watcherCallbacks.push(callback);
    }
    if (this._watcher) {
      return this._watchers;
    }
    const sources = this.sources.filter(s => s.watch !== false);
    this._watchers = {};
    sources.forEach(source => {
      const watcher = watch(source.match);
      this._watcherCallbacks.forEach(callback => {
        const cb = path => callback(this.getMountedPath(path, source.name));
        watcher.on('add', path => cb(path));
        watcher.on('change', path => cb(path));
        watcher.on('unlink', path => cb(path));
      });
      this._watchers[source.name] = watcher;
    });
    return this._watchers;
  }

  [Symbol.iterator]() {
    return this.sources[Symbol.iterator]();
  }
}

function resolveSrc(sources) {
  sources.forEach(source => {
    source.src = normalizePath(source.src);
    const glob = globBase(source.src);
    source.src = glob.isGlob ? glob.base : source.src;
    source.glob = glob.isGlob ? glob.glob : null;
    source.match = source.src;
  });
  return sources;
}

module.exports = Assets;
