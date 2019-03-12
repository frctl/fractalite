const { TwingSource, TwingErrorLoader } = require('twing');

module.exports = function(compiler, opts = {}) {
  const templates = new Map();

  /*
   * Each time the compiler finishes, clear and rebuild
   * the set of available templates.
   */
  compiler.on('finish', state => {
    templates.clear();
    state.components.forEach(component => {
      const view = component.matchFiles(opts.views)[0];
      if (view) {
        const contentsGetter = () => view.getContentsSync();
        templates.set(view.relative, contentsGetter); // look up by src-relative path
        templates.set(component.name, contentsGetter); // lookup by component name
        for (const scenario of component.scenarios) {
          templates.set(`${component.name}/${scenario.name}`, contentsGetter); // lookup by component/scenario name
        }
      }
    });
  });

  function getTemplateContents(name) {
    return templates.get(name)();
  }

  return {
    getSourceContext(name) {
      if (!this.exists(name)) {
        throw new TwingErrorLoader(`Template "${name}" is not defined.`);
      }
      return new TwingSource(getTemplateContents(name), name);
    },

    exists(name) {
      return templates.has(name);
    },

    getCacheKey(name) {
      if (!this.exists(name)) {
        throw new TwingErrorLoader(`Template "${name}" is not defined.`);
      }
      return name + ':' + getTemplateContents(name);
    },

    isFresh(name, time) {
      if (!this.exists(name)) {
        throw new TwingErrorLoader(`Template "${name}" is not defined.`);
      }
      return true;
    },

    resolve(name) {
      return name;
    }
  };
};
