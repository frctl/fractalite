const cosmiconfig = require('cosmiconfig');

module.exports = async function(opts = {}) {
  let configFile;

  if (opts.path) {
    const configFinder = cosmiconfig(opts.name || 'fractal');
    configFile = await configFinder.load(opts.path);
  } else {
    const configFinder = cosmiconfig(opts.name || 'fractal', {
      stopDir: opts.cwd || process.cwd()
    });
    configFile = await configFinder.search();
  }

  if (configFile === null) {
    throw new Error('Config file not found.');
  }

  return {
    path: configFile.filepath,
    config: configFile.config
  };
};
