const { relative, parse } = require('path');
const { collect } = require('@fractalite/support/helpers');
const { titlize } = require('@fractalite/support/utils');
const { read } = require('@fractalite/core');
const { watch } = require('chokidar');
const { map } = require('asyncro');
const matter = require('gray-matter');
const slash = require('slash');

module.exports = function(opts = {}) {
  if (typeof opts === 'string') opts = { src: opts };

  return async function pagesPlugin(app) {
    let pages = collect();

    if (!opts.src) {
      app.addViewGlobal('pages', pages);
      return;
    }

    app.use((ctx, next) => {
      ctx.pages = pages;
      return next();
    });

    app.addRoute('api.page', '/api/pages/:path(.+).json', async (ctx, next) => {
      const path = ctx.params.path === 'index' ? '/' : `/${ctx.params.path}`;
      let page = pages.find({ url: path });
      if (page) {
        let content = await page.getContents(ctx.state);
        page = { ...page, content };
        page.content = page.view
          ? await app.views.renderAsync(page.view, { ...ctx.state, page })
          : page.content;
        ctx.body = { ...page };
      }
      return next();
    });

    app.addRoute('page', ':path(.*)', async (ctx, next) => {
      const page = pages.find({ url: ctx.params.path });
      if (page) {
        await ctx.render('app');
      }
      return next();
    });

    // app.addBuildStep('page', ({ requestRoute }) => {
    //   pages.forEach(page => requestRoute('page', { path: page.path }));
    // });

    if (app.mode === 'develop') {
      await setPages();
      watch(opts.src, { ignoreInitial: true }).on('all', async () => {
        await setPages();
        app.emit('updated');
      });
    } else if (app.mode === 'build') {
      await setPages();
    }

    async function setPages() {
      const files = await read(opts.src, { onlyFiles: true });
      pages = collect(await map(files, async file => makePage(file)));

      if (!pages.find({ url: '/' })) {
        const page = {
          url: '/',
          index: true,
          order: 1,
          treePath: '/',
          label: opts.indexLabel || 'Overview',
          view: false
        };
        page.getContents = ctx => app.views.renderAsync('overview', { ...ctx, page });
        pages = pages.push(page);
      }

      app.addViewGlobal('pages', pages);
      app.api.pages = pages;
      app.api.getPages = () => pages;
    }

    async function makePage(file) {
      try {
        const content = await file.getContents();
        const parsed = matter(Object.assign({ content }, opts.frontmatter));
        const { ext } = parse(file.relative);
        const { data } = parsed;

        const page = Object.assign({}, data);

        const segments = file.relative
          .replace(ext, '')
          .split('/')
          .map(segment => segment.match(/^(?:(\d+)-)?(.*)$/)[2]);

        let urlPath = segments.join('/');
        if (urlPath === 'index' || /^.*\/index$/.test(urlPath)) {
          if (urlPath === 'index') {
            urlPath = '';
          }
          // urlPath = segments.splice(0, -1, 'overview').join('/');
          page.index = true;
          page.label = page.label || opts.indexLabel || 'Overview';
          page.order = page.order || 1;
        } else {
          page.label = page.label || titlize(file.name);
        }

        if (page.view !== false) {
          page.view = opts.view === false ? false : 'page';
        }

        page.treePath = urlPath;
        page.url = app.url('page', { path: '/' + urlPath });

        page.getContents = async ctx => {
          let content = await app.views.renderStringAsync(parsed.content || '', { ...ctx, page });
          if (page.markdown !== false) {
            content = app.markdown.render(content);
          }
          return content;
        };

        return page;
      } catch (err) {
        app.emit('error', err);
      }
    }
  };
};
