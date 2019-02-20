module.exports = [
  {
    key: 'components.opts.files',
    handler: require('./files')
  },
  {
    key: 'components.opts.config',
    handler: require('./config')
  },
  {
    key: 'components.opts.name',
    handler: require('./name')
  },
  {
    key: 'components.opts.label',
    handler: require('./label')
  },
  {
    key: 'components.opts.scenarios',
    handler: require('./scenarios')
  }
];
