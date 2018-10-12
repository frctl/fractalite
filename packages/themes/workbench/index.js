const { resolve } = require('path');

module.exports = {
  views: [resolve(__dirname, 'src/views')],
  assets: [
    {
      name: 'theme',
      src: resolve(__dirname, 'dist'),
      mount: '/assets/_ui/theme',
      watch: false
    }
  ],
  stylesheets: ['theme:workbench.css'],
  scripts: ['theme:workbench.js'],
  globals: {
    theme: {
      name: 'workbench',
      version: require('./package.json').version
    },
    site: {
      title: 'Fractalite Workbench'
    }
  },
  routes: [
    {
      url: '/state.json',
      name: 'state',
      view: 'state.njk'
    },
    {
      url: '/preview/:component(/:variant)',
      name: 'preview',
      view: 'preview.njk',
      handler: 'preview'
    },
    {
      url: '/render/:component(/:variant)',
      name: 'render',
      view: 'render.njk',
      handler: 'preview',
      generator: 'component/variant'
    }
  ]
};
