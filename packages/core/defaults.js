module.exports = {
  engine: null,
  plugins: [
    require('./src/plugins/config'),
    require('./src/plugins/name'),
    require('./src/plugins/label'),
    require('./src/plugins/view'),
    require('./src/plugins/notes'),
    require('./src/plugins/variants')
  ],
  pluginOpts: {
    config: {
      defaults: {},
      finder: {
        searchPlaces: [
          'package.json',
          '{name}.config.js',
          '{name}.config.json',
          '{name}.config.yml',
          'config.js',
          'config.json',
          'config.yml'
        ],
        packageProp: 'fractal'
      },
      resolve: {
        '~': process.cwd()
      }
    },
    view: {
      match: 'view.*'
    }
  },
  transform: require('./src/transform')
};
