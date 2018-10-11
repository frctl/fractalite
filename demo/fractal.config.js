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
        name: 'site-assets',
        mount: '/assets'
      }
    ],
    preview: {
      head: `<link rel="stylesheet" href="{{ asset('app.css', 'site-assets') }}">`,
      foot: `<script src="{{ asset('app.js', 'site-assets') }}"></script>`
    },
    build: {}
  },
  cli: {
    commands: ['./lib/commands/list']
  }
};
