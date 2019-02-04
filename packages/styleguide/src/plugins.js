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
    key: 'opts.shortlinks',
    handler: require('./shortlinks')
  },
  {
    key: 'opts.meta',
    handler: require('./metadata')
  },
  {
    key: 'preview',
    handler: require('./preview')
  },
  {
    key: 'pages',
    handler: require('./pages')
  },
  {
    key: 'nav',
    handler: require('./navigation')
  },
  {
    key: 'inspector.overview',
    handler: require('./inspector-overview')
  },
  {
    key: 'inspector.code',
    handler: require('./inspector-code')
  }
];
