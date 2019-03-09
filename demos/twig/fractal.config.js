const { resolve } = require('path');

module.exports = {
  title: 'Twig Demo',

  components: resolve(__dirname, './src/components'),

  adapter: require('@frctl/fractalite-adapter-twig')({})
};
