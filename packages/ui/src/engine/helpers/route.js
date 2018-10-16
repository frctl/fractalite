module.exports = function route([name, params], { utils }) {
  if (params && params.urlPath) {
    params = Object.assign({}, params, {
      _: params.urlPath
    });
  }
  return utils.route(name, params);
};
