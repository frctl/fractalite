const { parseHandle } = require('@fractalite/support/helpers');

module.exports = function(ui) {
  return {
    handleToParams(handle) {
      return parseHandle(handle);
    }
  };
};
