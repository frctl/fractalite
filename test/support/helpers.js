require('./env');
const { resolve } = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports.expect = chai.expect;
module.exports.request = chai.request;
module.exports.sinon = require('sinon');

module.exports.paths = {
  fixtures: resolve(__dirname, '../fixtures')
};
