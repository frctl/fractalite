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

        const html = await map(scenario.preview.props, async props => {
          const html = await renderer.render(component, props);
          return opts.prettify ? beautify.html(html, opts.prettify) : html;
        });

        return { html };
      }
    });
  };
};
