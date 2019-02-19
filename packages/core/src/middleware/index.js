module.exports = [
  {
    key: 'components.opts.files',
    handler: require('./component-files')
  },
  {
    key: 'components.opts.config',
    handler: require('./component-config')
  },
  {
    key: 'components.opts.name',
    handler: require('./component-name')
  },
  {
    key: 'components.opts.label',
    handler: require('./component-label')
  },
  {
    key: 'components.opts.scenarios',
    handler: require('./component-scenarios')
  }
];
