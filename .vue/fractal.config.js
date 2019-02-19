const { resolve, join, relative, dirname } = require('path');
const { outputFile } = require('fs-extra');
const { merge, camelCase } = require('lodash');
const { source } = require('common-tags');
const vueAdapter = require('./adapter-vue')({});

module.exports = {
  title: 'Vue Demo',

  adapter: vueAdapter,

  components: resolve(__dirname, './src/components'),

  plugins: [
    require('@fractalite/styleguide-plugin-assets-bundler')({
      entryFile: resolve(__dirname, './preview.js'),
      outFile: resolve(__dirname, './dist/assets/build.js'),
      entryBuilder: vueAdapter.entryBuilder
    })
  ]
};
