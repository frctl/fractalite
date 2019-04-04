const JSON5 = require('json5');
const stripIndent = require('strip-indent');
const { parse } = require('node-html-parser');
const { map, isPlainObject, isString } = require('lodash');

module.exports = function(opts = {}) {
  return {
    async render(component, props, state) {
      const attrs = map(props, toVueAttr);
      return `
        <${component.name} ${attrs.join('\n')}></${component.name}>
      `;
    },

    getPreviewString(content) {
      return `<div id="${opts.previewAppId}">${content}</div>`;
    },

    async getTemplateString(component) {
      const vueFile = component.files.find(f => f.ext === '.vue');
      const contents = vueFile ? await vueFile.getContents() : null;
      if (contents) {
        const root = parse(contents);
        const tpl = root.querySelector('template');
        return tpl ? stripIndent(tpl.innerHTML) : null;
      }
      return null;
    }
  };
};

function toVueAttr(value, key) {
  if (isPlainObject(value) || Array.isArray(value)) {
    return `:${key}="${JSON5.stringify(value, { quote: "'" })}"`;
  }
  if (isString(value)) {
    return `${key}="${value}"`;
  }
  // TODO: handle Date instances and other objects...
  return `:${key}="${value}"`;
}
