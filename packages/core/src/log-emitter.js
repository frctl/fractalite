const { EventEmitter2 } = require('eventemitter2');

const levels = ['success', 'debug', 'info', 'error', 'warn', 'complete'];

class LogEmitter {
  constructor(emitter) {
    this._emitter = emitter || new EventEmitter2({ wildcard: true });
  }

  _emit(level, msg) {
    this._emitter.emit(`log.${level}`, msg);
    return this;
  }
}

for (const level of levels) {
  LogEmitter.prototype[level] = function(...args) {
    return this._emit(level, ...args);
  };
}

module.exports = LogEmitter;
