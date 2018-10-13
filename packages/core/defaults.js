module.exports = {
  src: {
    path: null,
    opts: {
      gitignore: false
    }
  },
  plugins: [
    require('./src/plugins/config'),
    require('./src/plugins/name'),
    require('./src/plugins/label'),
    require('./src/plugins/view'),
    require('./src/plugins/notes'),
    require('./src/plugins/variants')
  ],
  engine: '@fractalite/engine-nunjucks',
  watch: {
    opts: {},
    paths: []
  },
  opts: {
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
  }
};
