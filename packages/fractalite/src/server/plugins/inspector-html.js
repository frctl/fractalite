/* eslint camelcase: "off" */

const beautify = require('js-beautify');
const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const { createRenderer } = require('@frctl/fractalite-core');
const { map } = require('asyncro');
const { html } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app, adapter) {
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

        const renderer = createRenderer(state, adapter);

        const html = await map(scenario.preview.props, async props => {
          const html = await renderer.render(component, props);
          return opts.prettify ? beautify.html(html, opts.prettify) : html;
        });

        return { html };
      }
    });
  };
};
