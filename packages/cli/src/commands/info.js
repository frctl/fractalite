/* eslint-disable unicorn/no-process-exit */

const { cyan, green } = require('kleur');
const { sortBy } = require('lodash');

module.exports = function info(opts = {}) {
  return function(app, args, config, { version, commands }) {
    this.log(`
      ${green(`${args.$} CLI v${version}`)}

      Available commands:
      `);

    for (const command of sortBy(commands, 'name')) {
      this.log(
        `→ ${cyan(`${args.$} ${command.name}`)}${
          command.description ? ` - ${command.description}` : ''
        }`
      );
    }

    process.exit(0);
  };
};

module.exports.hidden = true;
