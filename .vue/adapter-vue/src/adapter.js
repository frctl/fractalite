const JSON5 = require('json5');
const { map, mapValues, isPlainObject, isString } = require('lodash');

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
