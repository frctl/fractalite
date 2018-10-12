const { resolve } = require('path');
const dataDir = resolve(__dirname, 'lib/data');

module.exports = {
  src: resolve(__dirname, 'src/components'),
  watch: [dataDir],
  opts: {
    config: {
      resolve: {
        '%': dataDir
      }
    }
  },
  plugins: ['./lib/plugins/context-defaults'],
  ui: {
    globals: {
      site: {
        title: 'Fractalite demo'
      }
    },
    assets: [
      {
        src: resolve(__dirname, 'dist/assets'),
        name: 'demo',
        mount: '/assets'
      }
    ],
    preview: {
      stylesheets: ['app.css'],
      scripts: ['app.js']
    },
    build: {}
  },
  cli: {
    commands: ['./lib/commands/list']
  }
};
