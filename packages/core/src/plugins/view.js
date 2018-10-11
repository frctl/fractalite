const { readFile } = require('fs-extra');
const pupa = require('pupa');
const multimatch = require('multimatch');

module.exports = function view(opts = {}) {
  return function(components) {
    return Promise.all(
      components.map(async component => {
        let matcher = opts.match || 'view.*';
        matcher = [].concat(matcher).map(match => pupa(match, component));
        const view = component.files.find(f => {
          return multimatch(f.path, matcher, { matchBase: true }).length;
        });
        if (view) {
          const { path, ext } = view;
          const contents = await readFile(path, 'utf-8');
          component.view = { contents, path, ext, _raw: contents };
          component.view.toString = () => contents;
        }
        return component;
      })
    );
  };
};
