const { resolve } = require('path');
const config = require('./fractal.config');

const theme = require('@fractalite/theme-styleguide')({
  pages: resolve(__dirname, 'lib/styleguide/pages')
});

config.ui.theme = theme;
config.ui.build.dest = resolve(__dirname, 'dist/styleguide');
config.ui.pages = {
  src: resolve(__dirname, 'src/docs')
};

module.exports = config;
