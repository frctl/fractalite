const { resolve } = require('path');
const config = require('./fractal.config');

config.ui.theme = '@fractalite/theme-workbench';
config.ui.build.dest = resolve(__dirname, 'dist/workbench');

module.exports = config;
