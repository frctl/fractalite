const { extname } = require('path');
const { Asset } = require('@fractalite/core');
const { readFile } = require('fs-extra');
const { resolveFileUrl, rewriteUrls } = require('@fractalite/support/helpers');
const { map } = require('asyncro');

module.exports = function(opts = {}) {
  return function inspectorNotesPlugin(app) {
    if (opts === false) return;

    const filename = (opts.filename || 'readme.md').toLowerCase();

    app.get('inspector.panels').push({
      label: opts.label || 'Notes',
      async content(ctx) {
        const { component } = ctx;
        const notes = component.notes ? component.notes : '_No notes available_';
        let rendered = await app.renderMarkdown(notes);
        return rewriteUrls(rendered, path => {
          const file = resolveFileUrl(path, component.files, app.api.files, app.api.assets);
          if (file) {
            return Asset.isAsset(file)
              ? app.url('asset', { asset: file })
              : app.url('src', { file });
          }
          if (path[0] === '@' && !extname(path)) {
            return app.url('inspect', { variant: path.replace('@', '') });
          }
        });
      }
    });

    app.compiler.use(async ({ components }) => {
      await map(components, async component => {
        const readme = component.files.find(file => file.basename.toLowerCase() === filename);
        if (readme) {
          component.notes = await readFile(readme.path, 'utf-8');
        }
      });
    });
  };
};
