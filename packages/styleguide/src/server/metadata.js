module.exports = function(opts = {}) {
  return function metadataPlugin(app) {
    const meta = {
      title: app.get('title'),
      lang: 'en',
      dir: 'ltr',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0'
    };
    app.set('meta', Object.assign(meta, opts));
  };
};
