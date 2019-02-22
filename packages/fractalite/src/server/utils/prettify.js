const prettier = require('prettier');

module.exports = function() {
  return function prettify(str, opts = 'babel') {
    if (typeof opts === 'string') {
      opts = { parser: opts };
    }
    if (!opts.parser || opts.parser === 'js' || opts.parser === 'json') {
      opts.parser = 'babel';
    }
    return prettier.format(str, opts);
  };
};
