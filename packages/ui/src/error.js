module.exports = function UiError(message, status = 500) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
};

require('util').inherits(module.exports, Error);
