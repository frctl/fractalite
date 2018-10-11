const { join, resolve, relative } = require('path');
const { outputFile } = require('fs-extra');
const del = require('del');
const { normalizePath, permalinkify } = require('@fractalite/support/utils');
const cpFile = require('cp-file');
const globby = require('globby');
const { flatten, compact } = require('lodash');

class Builder {
  constructor(opts = {}) {
    if (!opts.dest) {
      throw new Error('You must supply a build destination path [no-dest]');
    }
    this._opts = opts;
    this._dest = normalizePath(opts.dest);
    this._lastRun = null;
  }

  get dest() {
    return this._dest;
  }

  get stats() {
    return this._lastRun;
  }

  async copyAssets(assets) {
    const files = Promise.all(
      [...assets].map(async assetSource => {
        if (assetSource.copy === false) {
          return [];
        }
        const src = relative(process.cwd(), resolve(assetSource.src));
        const mount = assetSource.mount.replace(/^\//, '');
        const files = await globby([assetSource.src, '!**/node_modules'], {
          onlyFiles: true,
          gitignore: !(this._opts.gitignore === false)
        });
        return Promise.all(
          files.map(async path => {
            const mountedPath = join(mount, relative(src, path));
            const permalink = permalinkify(mountedPath, this._opts);
            const destPath = join(this._dest, permalink);
            if (path === destPath) {
              return;
            }
            await cpFile(path, destPath);
            return {
              src: path,
              dest: relative(process.cwd(), destPath)
            };
          })
        );
      })
    );
    return compact(flatten(await files));
  }

  async writePages(router, state = {}) {
    let pages = await router.generate(state);
    pages = await Promise.all(
      pages.map(async page => {
        page.path = join(this._dest, permalinkify(page.url, this._opts));
        await outputFile(page.path, page.contents);
        return page;
      })
    );
    return pages;
  }

  async run(assets, router, state) {
    const { clean } = this._opts;
    if (clean) {
      const target = typeof clean === 'string' ? clean : join(this._dest, '/**');
      await del(target);
    }
    const result = await Promise.all([this.copyAssets(assets), this.writePages(router, state)]);
    this._lastRun = {
      files: result[0],
      pages: result[1]
    };
    return this._lastRun;
  }
}

module.exports = Builder;
