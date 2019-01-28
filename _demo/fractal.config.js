const { join, resolve, basename } = require('path');
const adapter = require('../packages/adapter-nunjucks')();

module.exports = {
  adapter,

  components: {
    src: resolve(__dirname, './src/components'),
    opts: {
      config: {
        resolve: {
          '%': resolve(__dirname, './lib/data')
        }
      }
    },
    watch: {},
    plugins: []
  },

  assets: {
    src: [resolve(__dirname, './dist/assets'), resolve(__dirname, './dist/styleguide')],
    plugins: [
      function asd() {
        return function(assets) {
          return assets.map(asset => {
            asset.handle = join(basename(asset.root), asset.handle);
            return asset;
          });
        };
      }
    ]
  },

  styleguide: {
    theme: function(app) {
      app.addViewPath(resolve(__dirname, './views'));

      return app;
    }
  }
};
