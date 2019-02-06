const beautify = require('js-beautify');
const { defaultsDeep } = require('@fractalite/support/utils');
const { map } = require('asyncro');
const { html, stripIndent } = require('common-tags');

module.exports = function(opts = {}) {
  return function inspectorHTMLPlugin(app) {
    if (opts === false) return;

    opts = defaultsDeep(opts, {
      prettify: {
        indent_size: 2,
        preserve_newlines: false
      }
    });

    app.styleguide.addInspectorPanel({
      name: 'html',
      label: opts.label || 'HTML',
      template: html`
        <codemirror
          :value="panel.props.html.join('\\n\\n')"
          :options="{ mode: 'htmlmixed' }"
        />
      `,
      async props({ variant }) {
        if (!variant) return;

        const html = await map(variant.previewProps, async props => {
          let html = await app.api.render(variant, props);
          return opts.prettify !== false ? beautify['html'](html, opts.prettify) : html;
        });

        return { html };
      }
    });
  };
};
