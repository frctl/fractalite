const { Signale } = require('signale');
const stripIndent = require('strip-indent');

module.exports = function(opts = {}) {
  const logger = new Signale(opts);

  const oldLog = logger.log;
  logger.log = function(arg, ...args) {
    if (typeof arg === 'string') {
      return oldLog(stripIndent(arg, ...args));
    }
    return oldLog(arg, ...args);
  };

  Object.defineProperty(logger, 'br', {
    get() {
      logger.log('');
      return logger;
    }
  });

  return logger;
};
