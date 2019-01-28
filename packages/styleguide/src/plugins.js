module.exports = [
  {
    key: 'opts.markdown',
    handler: require('./markdown')
  },
  {
    key: 'opts.preview',
    handler: require('./preview')
  },
  {
    key: 'opts.notes',
    handler: require('./panel-notes')
  },
  {
    key: 'opts.meta',
    handler: require('./metadata')
  },
  {
    key: 'opts.pages',
    handler: require('./pages')
  }
];
