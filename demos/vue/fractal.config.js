const { resolve } = require('path');
const vueAdapter = require('@frctl/fractalite-adapter-vue')({
  // Vue adapter opts here
});

module.exports = {
  title: 'Vue Demo',

  adapter: vueAdapter,

  components: resolve(__dirname, './src/components'),

  plugins: [
    require('@frctl/fractalite-plugin-assets-bundler')({
      entryBuilder: vueAdapter.entryBuilder, // Add Vue entry builder
      entryFile: resolve(__dirname, './src/assets/preview.js'),
      outFile: resolve(__dirname, './dist/assets/build.js')
    })
  ]
};
