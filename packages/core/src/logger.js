const { EventEmitter2 } = require('eventemitter2');

class Logger {
  constructor(emitter) {
    this._emitter = emitter || new EventEmitter2({ wildcard: true });
  }

  debug(msg) {
    return this._emit('debug', msg);
  }

  info(msg) {
    return this._emit('info', msg);
  }

  warn(msg) {
    return this._emit('warn', msg);
  }

  success(msg) {
    return this._emit('success', msg);
  }

  complete(msg) {
    return this._emit('complete', msg);
  }

  error(msg) {
    return this._emit('error', msg);
  }

  _emit(level, msg) {
    this._emitter.emit(`log.${level}`, msg);
    return this;
  }
}

module.exports = Logger;
