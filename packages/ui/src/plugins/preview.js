const { get, isString, flatten, compact } = require('lodash');
const { mergeSrcRefs } = require('@fractalite/support/helpers');

module.exports = function uiPreview(opts, ui) {
  return function(components) {
    let configOpts = ui.config.preview;
    configOpts = isString(configOpts) ? { contents: configOpts } : configOpts;

    return Promise.all(
      components.map(component => {
        let componentOpts = get(component, 'config.preview', {});
        componentOpts = isString(componentOpts) ? { contents: componentOpts } : componentOpts;

        const fixRelPaths = paths => {
          paths = [].concat(paths);
          return paths.map(path => {
            if (path && path.startsWith('./')) {
              return `src:${component.relative}${path.replace(/^\./, '')}`;
            }
            return path;
          });
        };

        let stylesheets = flatten([
          get(configOpts, 'stylesheets', []),
          get(componentOpts, 'stylesheets', [])
        ]);
        stylesheets = compact(stylesheets).map(fixRelPaths);
        stylesheets = mergeSrcRefs(stylesheets).map(ref => ui.assets.getMountedPath(ref));

        let scripts = flatten([get(configOpts, 'scripts', []), get(componentOpts, 'scripts', [])]);
        scripts = compact(scripts).map(fixRelPaths);
        scripts = mergeSrcRefs(scripts).map(ref => ui.assets.getMountedPath(ref));

        component.preview = Object.assign({}, configOpts, componentOpts, {
          stylesheets,
          scripts
        });
        return component;
      })
    );
  };
};
