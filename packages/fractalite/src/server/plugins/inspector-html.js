/* eslint camelcase: "off" */
const beautify = require('js-beautify');
const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const { map } = require('asyncro');
const { html } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app, compiler, renderer) {
    if (opts === false) return;

    opts = defaultsDeep(opts, {
      prettify: {
        indent_size: 2,
        preserve_newlines: false
      }
    });

    app.addInspectorPanel({
      name: 'html',
      label: opts.label || 'HTML',
      template: html`
        <codemirror
          :value="panel.props.html.join('\\n\\n')"
          :options="{ mode: 'htmlmixed' }"
        />
      `,
      async props(state) {
        const { scenario, component } = state;

        let items = await renderer.renderAllToStaticMarkup(component, scenario.preview.props);
        items = items.map(item => (opts.prettify ? beautify.html(item, opts.prettify) : item));

        return { html: items };
      }
    });
  };
};
