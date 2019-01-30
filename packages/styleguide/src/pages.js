const { relative, parse } = require('path');
const { collect, normalizeSrc } = require('@fractalite/support/helpers');
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

    app.addRoute('page', ':path(.*)', async (ctx, next) => {
      const page = pages.find({ url: ctx.params.path });
      if (page) {
        ctx.page = page;
        if (page.view) {
          return ctx.render(page.view, { page });
        } else {
          ctx.body = page.content;
        }
      }
      return next();
    });

    app.addBuildStep('page', ({ requestRoute }) => {
      pages.forEach(page => requestRoute('page', { path: page.path }));
    });

    if (app.mode === 'develop') {
      await setPages();
      watch(opts.src, { ignoreInitial: true }).on('all', async function() {
        await setPages();
        app.emit('updated');
      });
    } else if (app.mode === 'build') {
      await setPages();
    }

    async function setPages() {
      const files = await read(opts.src, { onlyFiles: true });

      pages = collect(
        await map(files, async file => {
          try {
            const content = await file.getContents();
            const parsed = matter(Object.assign({ content }, opts.frontmatter));
            const rel = slash(relative(opts.src, file.path));
            const { ext, base, name } = parse(file.path);
            const { data } = parsed;

            const page = Object.assign({}, data);

            const segments = rel
              .replace(ext, '')
              .split('/')
              .map(segment => segment.match(/^(?:(\d+)-)?(.*)$/)[2]);

            let urlPath = segments.join('/');
            if (urlPath === 'index' || /^.*\/index$/.test(urlPath)) {
              urlPath = segments.slice(0, -1).join('/');
              page.index = true;
              page.label = page.label || opts.indexLabel || 'Overview';
              page.order = page.order || 1;
            } else {
              page.label = page.label || titlize(file.name);
            }

            if (page.view !== false) {
              page.view = opts.view === false ? false : 'page';
            }

            page.url = app.url('page', { path: '/' + urlPath });
            page.content = await app.views.renderStringAsync(parsed.content || '', { page });
            page.content = app.markdown.render(page.content);
            return page;
          } catch (err) {
            app.emit('error', err);
          }
        })
      );

      app.addViewGlobal('pages', pages);
      app.api.pages = pages;
      app.api.getPages = () => pages;
    }
  };
};
