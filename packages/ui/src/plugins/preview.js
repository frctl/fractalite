const { get, isString, merge } = require('lodash');

module.exports = function(opts, app, ui) {
  return function(components) {
    let configOpts = ui.config.preview;
    configOpts = isString(configOpts) ? { contents: configOpts } : configOpts;

    return Promise.all(
      components.map(component => {
        let componentOpts = get(component, 'config.preview', {});
        componentOpts = isString(componentOpts) ? { contents: componentOpts } : componentOpts;
        component.preview = merge({}, configOpts, componentOpts);
        return component;
      })
    );
  };
};
