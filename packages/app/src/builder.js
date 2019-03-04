const { join } = require('path');
const https = require('https');
const { outputFile } = require('fs-extra');
const { map } = require('asyncro');
const { normalizePath } = require('@frctl/fractalite-support/utils');
const cpFile = require('cp-file');
const axios = require('axios');
const del = require('del');
const throttle = require('p-throttle');

module.exports = function() {
  const copyTasks = [];
  const requestTasks = [];
  const builder = {};

  builder.addCopyTask = task => {
    copyTasks.push(task);
  };

  builder.addRequestTask = task => {
    requestTasks.push(task);
  };

  builder.run = async (server, opts = {}) => {
    if (!opts.dest) {
      throw new Error(`You must specify a build destination`);
    }
    const dest = normalizePath(opts.dest);

    if (opts.clean === true) {
      await del(dest);
    }

    const { port } = server.address();
    const protocol = server instanceof https.Server ? 'https' : 'http';
    const address = `${protocol}://${opts.hostname || '127.0.0.1'}:${port}`;

    const copies = map(copyTasks, async task => {
      const to = join(dest, task.to);
      await cpFile(task.from, to);
      return { ...task, to };
    });

    const throttledRequest = throttle(
      async task => {
        try {
          const to = join(dest, task.to);
          const { data } = await axios.get(`${address}${task.from}`);
          const contents = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
          await outputFile(to, contents);
          return { ...task, to };
        } catch (err) {
          // TODO: throw more descriptive error with URL
          throw err;
        }
      },
      opts.requestLimit || 1000,
      1000
    );

    const requests = map(requestTasks, throttledRequest);

    const [copyResults, requestResults] = await Promise.all([copies, requests]);

    return [...copyResults, ...requestResults];
  };

  return builder;
};
