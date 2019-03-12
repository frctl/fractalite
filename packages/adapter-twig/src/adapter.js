const { TwingEnvironment } = require('twing');
const createFractalTemplate = require('./template');
const createLoader = require('./loader');

module.exports = function(compiler, opts = {}) {
  const state = compiler.getState();
  const loader = createLoader(compiler, opts);

  const twing = new TwingEnvironment(loader, {
    ...opts.env,
    base_template_class: 'FractalTemplate'
  });

  const runtime = twing.getTemplateRuntime();
  runtime['FractalTemplate'] = createFractalTemplate(state);

  return async function render(component, props, state) {
    return twing.render(component.name, props);
  };
};
