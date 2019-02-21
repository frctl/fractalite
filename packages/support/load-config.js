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

  if (!configFile) {
    const error = new Error('Config file not found.');
    error.type = 'CONFIG_NOT_FOUND';
    throw error;
  }

  return {
    path: configFile.filepath,
    config: configFile.config
  };
};
