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
  globals: {
    theme: {
      name: 'styleguide',
      version: require('./package.json').version
    },
    site: {
      title: 'Project styleguide'
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
