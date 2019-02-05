const { relative, parse, resolve, extname } = require('path');
const { find, uniqBy } = require('lodash');
const { normalizeSrc, resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
const { titlize } = require('@fractalite/support/utils');
const { Asset, read } = require('@fractalite/core');
const { watch } = require('chokidar');
const { map } = require('asyncro');
const matter = require('gray-matter');

module.exports = function(opts = {}) {
  if (typeof opts === 'string' || Array.isArray(opts)) opts = { src: opts };

  return async function pagesPlugin(app) {
    let pages = [];

    opts.src = normalizeSrc(opts.src);
    opts.src.paths.push(resolve(__dirname, '../../pages'));

    app.use((ctx, next) => {
      ctx.pages = pages;
      return next();
    });

    app.addRoute('api.page', '/api/pages/:path(.+).json', async (ctx, next) => {
      const path = ctx.params.path === 'index' ? '/' : `/${ctx.params.path}`;
      let page = find(pages, { url: path });
      if (page) {
        const content = await app.utils.renderPage(page.raw, {
          markdown: page.markdown,
          template: page.template,
          ctx: { ...ctx.state, page }
        });
        ctx.body = { page, content };
      }
      return next();
    });

    app.addRoute('page', ':path(.*)', async (ctx, next) => {
      const page = find(pages, { url: ctx.params.path });
      if (page) {
        await ctx.render('app');
      }
      return next();
    });

    app.utils.parseFrontMatter = function(content, opts = {}) {
      return matter({ ...opts, content });
    };

    app.utils.renderPage = async function(str = '', opts = {}) {
      if (opts.template === true) {
        str = await app.utils.renderString(str, opts.ctx || {});
      }
      if (opts.markdown === true) {
        str = app.utils.renderMarkdown(str);
      }
      if (opts.refs === false) return str;

      return app.utils.replaceShortlinks(str, 'inspect');
    };

    // app.addBuildStep('page', ({ requestRoute }) => {
    //   pages.forEach(page => requestRoute('page', { path: page.path }));
    // });

    if (app.mode === 'develop') {
      await setPages();
      watch(opts.src.paths, { ignoreInitial: true }).on('all', async () => {
        await setPages();
        app.emit('updated');
      });
    } else if (app.mode === 'build') {
      await setPages();
    }

    async function setPages() {
      const files = await read(opts.src.paths, { ...opts.src.opts, onlyFiles: true });

      pages = uniqBy(await map(files, async file => makePage(file)), 'url');

      app.addViewGlobal('pages', pages);
      app.api.pages = pages;
      app.api.getPages = () => pages;
    }

    async function makePage(file) {
      const { data, content } = app.utils.parseFrontMatter(
        await file.getContents(),
        opts.frontmatter
      );
      const page = { ...data };

      const segments = file.relative
        .replace(file.extname, '')
        .split('/')
        .map(segment => segment.match(/^(?:(\d+)-)?(.*)$/)[2]);

      let urlPath = segments.join('/');
      if (urlPath === 'index' || /^.*\/index$/.test(urlPath)) {
        if (urlPath === 'index') {
          urlPath = '';
        }
        page.index = true;
        page.label = page.label || opts.indexLabel || 'Overview';
        page.order = page.order || 1;
      } else {
        page.label = page.label || titlize(file.name);
      }

      page.title = page.title || page.label;
      page.treePath = urlPath;
      page.url = app.url('page', { path: '/' + urlPath });

      page.layout = typeof page.layout === 'boolean' ? page.layout : true;
      page.markdown =
        typeof page.markdown === 'boolean'
          ? page.markdown
          : ['.md', '.markdown'].includes(file.ext);
      page.template = typeof page.template === 'boolean' ? page.template : file.ext === '.njk';

      page.raw = content;
      return page;
    }
  };
};
