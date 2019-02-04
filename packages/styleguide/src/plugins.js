module.exports = [
  {
    key: 'opts.highlight',
    handler: require('./highlight')
  },
  {
    key: 'opts.markdown',
    handler: require('./markdown')
  },
  {
    key: 'opts.preview',
    handler: require('./preview')
  },
  {
    key: 'opts.shortlinks',
    handler: require('./shortlinks')
  },
  {
    key: 'opts.pages',
    handler: require('./pages')
  },
  {
    key: 'opts.meta',
    handler: require('./metadata')
  },
  {
    key: 'opts.nav',
    handler: require('./navigation')
  },
  {
    key: 'opts.inspector.overview',
    handler: require('./inspector-overview')
  },
  {
    key: 'opts.inspector.code',
    handler: require('./inspector-code')
  }
];
