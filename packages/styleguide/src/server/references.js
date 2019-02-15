// const { mapValues } = require('lodash');
// const { rewriteUrls } = require('@fractalite/support/html');
// const { resolveReference } = require('@fractalite/core/helpers');
// const { isAsset, isComponent, isFile, isVariant } = require('@fractalite/core/helpers');
// const flatten = require('flat');
// const { map } = require('asyncro');

module.exports = function(app, adapter, opts = {}) {
  if (opts === false) return;

  const refMatcher = opts.match || /{(.*?)}/g;

  const lookup = {
    component(state, identifier) {
      return state.components.find(c => c.handle === identifier) || state.variants.find(c => c.handle === identifier);
    },
    variant(state, identifier) {
      return state.variants.find(c => c.handle === identifier);
    },
    asset(state, identifier) {
      return state.assets.find(c => c.handle === identifier);
    },
    file(state, identifier) {
      return state.files.find(c => c.handle === identifier);
    }
  };

  app.utils.addReferenceLookup = (key, handler) => {
    lookup[key] = handler;
    return app;
  };

  app.utils.parseRefs = str => {
    return str.replace(refMatcher, (matched, ref) => {
      const refParts = ref.split(':');

      const [entity, identifier, prop = 'url'] = refParts;

      if (!lookup[entity]) {
        app.emit('error', new Error(`Could not resolve reference tag - '${entity}' is not a recognised entity`));
        return '';
      }
      const target = lookup[entity](app.compiler.getState(), identifier);
      if (!target) {
        app.emit('error', new Error(`Could not resolve reference tag - '${entity}:${identifier}' not found`));
        return '';
      }
      return target[prop] || '';
    });
  };
};
