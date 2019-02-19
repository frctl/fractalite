module.exports = function(app, adapter, opts = {}) {
  if (opts === false) return;

  const refMatcher = opts.match || /{(.*?)}/g;

  const lookup = {
    component(state, identifier) {
      return state.components.find(c => c.name === identifier);
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
        throw new Error(`Could not resolve reference tag - '${entity}' is not a recognised entity`);
      }
      try {
        const target = lookup[entity](app.compiler.getState(), identifier);
        if (!target) {
          throw new Error(`Could not resolve reference tag - '${entity}:${identifier}' not found`);
        }
        return target[prop] || '';
      } catch (err) {
        app.emit('error', err);
        return '';
      }
    });
  };
};
