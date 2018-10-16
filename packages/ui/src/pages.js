const { flatten, uniqBy, isFunction } = require('lodash');
const { relative, extname, parse } = require('path');
const globby = require('globby');
const watch = require('glob-watcher');
const globBase = require('glob-base');
const slash = require('slash');
const matter = require('gray-matter');
const { readFile } = require('fs-extra');
const { toArray, normalizePaths, defaultsDeep, titlize } = require('@fractalite/support/utils');

class Pages {
  constructor(opts, state) {
    this._src = normalizePaths(toArray(opts.src));
    this._opts = opts;
    this._pages = [];
    this._initialised = false;
    this._watcher = null;
    this._watchCallbacks = [];
  }

  get pages() {
    return this._pages;
  }

  async init() {
    if (!this._initialised) {
      await this.updatePages();
      this._initialised = true;
    }
    return this.pages;
  }

  async updatePages() {
    this._pages.length = 0;
    const pages = await this.read();
    for (const page of pages) {
      this._pages.push(page);
    }
    return this.pages;
  }

  async read() {
    return flatten(
      await Promise.all(
        this._src.map(async src => {
          let paths = await globby([src, '!**/node_modules'], {
            onlyFiles: true
          });
          const glob = globBase(src);
          const root = glob.isGlob ? glob.base : src;
          const pages = await Promise.all(
            paths.filter(p => extname(p) === this._opts.ext).map(async path => {
              const content = await readFile(path, 'utf-8');
              const parsed = matter(Object.assign({ content }, this._opts.frontmatter));
              const rel = slash(relative(root, path));
              const { ext, base, name } = parse(path);
              const page = defaultsDeep({}, this._opts.defaults, parsed.data || {}, {
                path: slash(path),
                relative: rel,
                urlPath: rel.replace(this._opts.ext, ''),
                contents: parsed.content
              });
              page.label = page.label || titlize(name);
              page.title = page.title || page.label;
              return page;
            })
          );
          return uniqBy(pages, 'relative');
        })
      )
    );
  }

  watch(callback) {
    if (isFunction(callback)) {
      this._watchCallbacks.push(callback);
    }
    if (this._watcher) {
      return this._watcher;
    }
    this._watcher = watch(this._src, async () => {
      try {
        const pages = await this.updatePages();
        await Promise.all(this._watchCallbacks.map(cb => cb(pages)));
      } catch (err) {
        // TODO: catch and emit errors
        throw err;
      }
    });
    return this._watcher;
  }
}

module.exports = Pages;
