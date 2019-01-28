const { resolve } = require('path');

module.exports = {
  title: 'Fractalite demo!',

  adapter: require('../packages/adapter-nunjucks')(),

  components: {
    src: resolve(__dirname, './src/components')
  },

  assets: resolve(__dirname, './dist/assets'),

  // develop: {
  //   port: 3030
  // },
  //
  // build: {},

  opts: {
    pages: {
      src: resolve(__dirname, './src/pages'),
      indexLabel: 'Overview'
    },
    preview: {
      scripts: [],
      stylesheets: ['main.css']
    }
  },

  init(app) {
    // app customisation here
  }
};
