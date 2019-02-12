const { relative, parse, resolve, extname } = require('path');
const { find, uniqBy, cloneDeep, isBoolean } = require('lodash');
const { normalizeSrc } = require('@fractalite/support/utils');
const { rewriteUrls } = require('@fractalite/support/html');
const { titlize } = require('@fractalite/support/utils');
const { read, watch } = require('@fractalite/core');
const { map } = require('asyncro');
const matter = require('gray-matter');

module.exports = function(app, adapter, opts = {}) {
  if (typeof opts === 'string' || Array.isArray(opts)) opts = { src: opts };
  opts = cloneDeep(opts);
  opts.src = normalizeSrc(opts.src);
  opts.src.paths.push(resolve(__dirname, '../../pages'));

  let pages = [];

  app.utils.parseFrontMatter = function(content, opts = {}) {
    return matter({ ...opts, content });
  };

  app.utils.renderPage = async function(state, str = '', props = {}, opts = {}) {
    if (opts.template === true) {
      str = await app.views.renderStringAsync(str, { ...state, ...props });
    }
    if (opts.markdown === true) {
      str = app.utils.renderMarkdown(str);
    }
    if (opts.shortlinks === false) return str;
    return app.utils.replaceShortlinkAttrs(state, str, 'inspect');
  };

  app.use((ctx, next) => {
    ctx.pages = pages;
    ctx.state.pages = pages;
    return next();
  });

  app.addRoute('api.page', '/api/pages/:path(.+).json', async (ctx, next) => {
    const path = ctx.params.path === 'index' ? '/' : `/${ctx.params.path}`;
    let page = find(pages, { url: path });
    if (page) {
      const content = await app.utils.renderPage(
        ctx.state,
        page.raw,
        { page },
        {
          markdown: page.markdown,
          template: page.template
        }
      );
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

  app.on('initialised', async () => {
    try {
      if (app.mode === 'develop') {
        pages = await getPages();
        watch(opts.src.paths, { ignoreInitial: true }).on('all', async () => {
          try {
            pages = await getPages();
            app.emit('updated');
          } catch (err) {
            app.emit('error', err);
          }
        });
      } else if (app.mode === 'build') {
        pages = await getPages();
      }
    } catch (err) {
      app.emit('error', err);
    }
  });

  // // app.addBuildStep('page', ({ requestRoute }) => {
  // //   pages.forEach(page => requestRoute('page', { path: page.path }));
  // // });
  //

  async function getPages() {
    const files = await read(opts.src.paths, { ...opts.src.opts, onlyFiles: true });
    pages = await map(files, async file => {
      const { data, content } = app.utils.parseFrontMatter(
        await file.getContents(),
        opts.frontmatter
      );
      return makePage(file, content, data);
    });
    return uniqBy(pages, 'url');
  }

  function makePage(file, content, data) {
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
      page.position = page.position || 1;
    } else {
      page.label = page.label || titlize(file.name);
    }

    page.title = page.title || page.label;
    page.treePath = urlPath;
    page.url = app.url('page', { path: '/' + urlPath });

    page.layout = typeof page.layout === 'boolean' ? page.layout : true;

    page.markdown = isBoolean(page.markdown)
      ? page.markdown
      : ['.md', '.markdown'].includes(file.ext);
    page.template = isBoolean(page.template) ? page.template : file.ext === '.njk';

    page.raw = content;
    return page;
  }
};
