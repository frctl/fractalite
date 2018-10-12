const { Signale } = require('signale');
const kleur = require('kleur');
const stripIndent = require('strip-indent');

const levels = ['success', 'debug', 'info', 'error', 'warn', 'complete'];

class Logger {
  constructor() {
    this._logger = new Signale({
      types: {
        debug: {
          badge: '✎',
          color: 'gray'
        }
      }
    });
  }

  get colours() {
    return kleur;
  }

  get colors() {
    return this.colours;
  }

  br(count = 1) {
    this._logger.log('\n'.repeat(count - 1));
    return this;
  }

  log(...args) {
    if (typeof args[0] === 'string') {
      this._logger.log(stripIndent(args[0]), ...args.slice(1));
      return this;
    }
    this._logger.log(...args);
  }

  bind(emitter) {
    for (const level of levels) {
      emitter.on(`log.${level}`, (...args) => this[level](...args));
    }
    emitter.on('error', (...args) => this.error(...args));
    return this;
  }
}

for (const level of levels) {
  Logger.prototype[level] = function(...args) {
    this._logger[level](...args);
    return this;
  };
}

module.exports = Logger;
