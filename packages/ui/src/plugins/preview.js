const { get, isString } = require('lodash');
const { mergeSrcRefs } = require('@fractalite/support/helpers');

module.exports = function(opts, ui) {
  return function(components) {
    let configOpts = ui.config.preview;
    configOpts = isString(configOpts) ? { contents: configOpts } : configOpts;

    return Promise.all(
      components.map(component => {
        let componentOpts = get(component, 'config.preview', {});
        componentOpts = isString(componentOpts) ? { contents: componentOpts } : componentOpts;

        const stylesheets = mergeSrcRefs(
          get(configOpts, 'stylesheets', []),
          get(componentOpts, 'stylesheets', [])
        ).map(ref => ui.assets.getMountedPath(ref));

        const scripts = mergeSrcRefs(
          get(configOpts, 'scripts', []),
          get(componentOpts, 'scripts', [])
        ).map(ref => ui.assets.getMountedPath(ref));

        component.preview = Object.assign({}, configOpts, componentOpts, {
          stylesheets,
          scripts
        });
        return component;
      })
    );
  };
};
