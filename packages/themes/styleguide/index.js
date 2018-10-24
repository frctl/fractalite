const { resolve } = require('path');

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
      src: [resolve(__dirname, 'pages')],
      defaults: {
        view: 'page'
      }
    },
    routes: [
      {
        url: '/components/:component',
        name: 'component',
        view: 'component',
        handler: 'component'
      }
    ]
  };
};
