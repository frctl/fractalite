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
    key: 'opts.meta',
    handler: require('./metadata')
  },
  {
    key: 'opts.pages',
    handler: require('./pages')
  },
  {
    key: 'opts.notes',
    handler: require('./inspector-notes')
  },
  {
    key: 'opts.files',
    handler: require('./inspector-files')
  },
  {
    key: 'opts.html',
    handler: require('./inspector-html')
  }
];
