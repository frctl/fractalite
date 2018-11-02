const { resolve } = require('path');
const navGetter = require('./src/state-nav');

module.exports = function(opts = {}) {
  return {
    views: [resolve(__dirname, 'views')],
    assets: [
      {
        name: 'theme',
        src: resolve(__dirname, 'dist'),
        mount: '/assets/_ui/theme',
        watch: false
      }
    ],
    preview: {
      scripts: ['theme:iframe.js']
    },
    stylesheets: ['theme:styleguide.css'],
    scripts: ['theme:styleguide.js'],
    parser: {
      plugins: [require('./src/parser-plugin-urls')]
    },
    globals: {
      theme: {
        name: 'styleguide',
        version: require('./package.json').version,
        components: {
          title: 'Components'
        },
        pages: {
          title: 'Documentation'
        }
      },
      site: {
        title: 'Styleguide'
      }
    },
    pages: {
      // src: [resolve(__dirname, 'pages')],
      defaults: {
        view: 'page'
      }
    },
    routes: [
      {
        url: '/components/:component/:variant',
        name: 'variant',
        view: 'variant',
        handler: 'variant'
      }
    ],
    init(ui) {
      // Add a custom state getter to generate navigation tree
      ui.state.addGetter('nav', state => navGetter(state, ui));
    }
  };
};
