const { relative } = require('path');
const { merge, camelCase } = require('lodash');
const { source } = require('common-tags');
const createAdapter = require('./src/adapter');

const defaults = {
  previewAppId: 'prevue'
};

module.exports = function(opts = {}) {
  opts = merge(defaults, opts);
  const adapter = createAdapter(opts);

  function attacher(app) {
    return adapter;
  }

  attacher.entryBuilder = function(state, { dir }) {
    const imports = state.components.map(component => {
      const vueFile = component.files.find(f => f.ext === '.vue');
      const as = camelCase(component.name);
      const path = relative(dir, vueFile.path);
      return { as, name: component.name, path };
    });

    return source`
        import Vue from 'vue/dist/vue.js';

        ${opts.setup}

      ${imports.map(
        ({ name, as, path }) => source`
        import ${as} from './${path}';
        Vue.component('${name}', ${as});
      `
      )}

        new Vue({ el: '#${opts.previewAppId}' });
    `;
  };

  return attacher;
};
