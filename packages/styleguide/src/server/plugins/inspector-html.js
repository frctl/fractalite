/* eslint camelcase: "off" */

const beautify = require('js-beautify');
const { defaultsDeep } = require('@fractalite/support/utils');
const { createRenderer } = require('@fractalite/core');
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
        const { variant } = state;
        if (!variant) return;

        const renderer = createRenderer(state, adapter);

        const html = await map(variant.previewProps, async props => {
          const html = await renderer.render(variant, props);
          return opts.prettify ? beautify.html(html, opts.prettify) : html;
        });

        return { html };
      }
    });
  };
};
