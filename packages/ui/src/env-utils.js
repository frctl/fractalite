const { permalinkify } = require('@fractalite/support/utils');
const { parseHandle } = require('@fractalite/support/helpers');
const attributes = require('html-url-attributes');

const urlAttrs = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `(${Object.keys(attributes).join('|')})\=([\"\'])([^\"\']*)([\"\'])`,
  'gi'
);

module.exports = function(ui) {
  return {
    url(path) {
      return permalinkify(path, ui.env.urls);
    },

    route(name, params) {
      return this.url(ui.router.urlFor(name, params));
    },

    resolveUrlRefs(str, component) {
      return str.replace(urlAttrs, (...args) => {
        const [matched, attr, quoteOpen, assetPath, quoteClose] = args;
        if (component && assetPath.startsWith('./')) {
          for (const file of component.files) {
            if (file.relative === assetPath.replace(`^./`, '')) {
              return `${attr}=${quoteOpen}${file.url}${quoteClose}`;
            }
          }
        } else if (assetPath.startsWith('@')) {
          const { components } = ui.state;
          const pathParts = parseHandle(assetPath);
          const component = components.find(c => c.name === pathParts.component);
          if (!component) {
            throw new Error(
              `Could not resolve file reference - component '${pathParts.component}' not found`
            );
          }
          if (pathParts.path) {
            for (const file of component.files) {
              if (file.relative === pathParts.path) {
                return `${attr}=${quoteOpen}${file.url}${quoteClose}`;
              }
            }
          }
        }
        return matched;
      });
    }
  };
};
