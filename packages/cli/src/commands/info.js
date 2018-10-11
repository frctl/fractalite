/* eslint-disable unicorn/no-process-exit */

const { cyan, green } = require('kleur');
const { sortBy } = require('lodash');
const pkg = require('../../package.json');

module.exports = function info(opts = {}) {
  return function(args, config, { logger, commands, exit }) {
    logger.log(`
      ${green(`${args.$} CLI v${pkg.version}`)}

      Available commands:
      `);

    for (const command of sortBy(commands, 'name')) {
      logger.log(
        `→ ${cyan(`${args.$} ${command.name}`)}${
          command.description ? ` - ${command.description}` : ''
        }`
      );
    }
    logger.log('');
    exit();
  };
};

module.exports.hidden = true;
