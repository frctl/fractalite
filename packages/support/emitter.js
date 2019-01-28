const { EventEmitter2 } = require('eventemitter2');

const levels = ['success', 'debug', 'info', 'warn', 'complete'];

class Emitter {
  constructor(emitter) {
    this._emitter = emitter || new EventEmitter2({ wildcard: true });
  }

  on(...args) {
    return this._emitter.on(...args);
  }

  emit(...args) {
    return this._emitter.emit(...args);
  }
}

for (const level of levels) {
  Emitter.prototype[level] = function(msg, ...args) {
    this.emit(`log.${level}`, `${msg}`, ...args);
    return this;
  };
}

module.exports = Emitter;
