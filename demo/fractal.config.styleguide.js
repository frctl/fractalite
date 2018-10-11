const { resolve } = require('path');
const config = require('./fractal.config');

config.ui.theme = '@fractalite/theme-styleguide';
config.ui.build.dest = resolve(__dirname, 'dist/styleguide');

module.exports = config;
