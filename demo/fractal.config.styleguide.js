const { resolve } = require('path');
const config = require('./fractal.config');

config.ui.theme = '@fractalite/theme-styleguide';
config.ui.themeOpts = {};
config.ui.build.dest = resolve(__dirname, 'dist/styleguide');
config.ui.pages = {
  src: resolve(__dirname, 'src/docs')
};

module.exports = config;
