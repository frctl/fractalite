const { resolve } = require('path');
const { find, uniqBy, cloneDeep, isBoolean } = require('lodash');
const { normalizeSrc } = require('@fractalite/support/utils');
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

  app.utils.renderPage = async function(str = '', props = {}, opts = {}) {
    const state = app.compiler.getState();
    if (opts.template === true) {
      str = await app.views.renderStringAsync(str, { ...state, ...props });
    }
    if (opts.refs === true) {
      str = app.utils.parseRefs(str);
    }
    if (opts.markdown === true) {
      str = app.utils.renderMarkdown(str);
    }
    return str;
  };

  app.addRoute('api.page', '/api/pages/:path(.+).json', async (ctx, next) => {
    const path = ctx.params.path === 'index' ? '/' : `/${ctx.params.path}`;
    const page = find(pages, { url: path });
    if (page) {
      const content = await app.utils.renderPage(
        page.raw,
        { page },
        {
          markdown: page.markdown,
          template: page.template,
          refs: page.refs
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

  app.beforeStart(async (app, state) => {
    try {
      if (app.mode === 'develop') {
        pages = await getPages();
        state.pages = pages;
        watch(opts.src.paths, { ignoreInitial: true }).on('all', async () => {
          try {
            pages = await getPages();
            state.pages = pages;
            app.emit('updated');
          } catch (err) {
            app.emit('error', err);
          }
        });
      } else if (app.mode === 'build') {
        pages = await getPages();
        state.pages = pages;
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
      const { data, content } = app.utils.parseFrontMatter(await file.getContents(), opts.frontmatter);
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

    page.handle = urlPath;
    page.title = page.title || page.label;
    page.treePath = urlPath;
    page.url = app.url('page', { path: '/' + urlPath });

    page.layout = typeof page.layout === 'boolean' ? page.layout : true;

    page.refs = isBoolean(page.refs) ? page.refs : true;
    page.markdown = isBoolean(page.markdown) ? page.markdown : ['.md', '.markdown'].includes(file.ext);
    page.template = isBoolean(page.template) ? page.template : file.ext === '.njk';

    page.raw = content;
    return page;
  }
};
