const { isString } = require('lodash');
const { parseHandle } = require('@fractalite/support/helpers');

module.exports = function(ui) {
  return {
    handleToParams(handle) {
      if (isString(handle)) {
        return parseHandle(handle);
      }
      return handle;
    }
  };
};
