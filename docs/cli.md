# CLI

## Configuration

Project level configuration can be provided to the CLI via a `fractal.config.js` file in the root of the project.

At a minimum a `src` property with the absolute path to the components directory must be provided:

```js
// fractal.config.js
const { resolve } = require('path');

module.exports = {
  src: resolve(__dirname, 'src/components')
};
```

### Plugins

Plugins can be added via the `plugins` array. Each entry should be one of the following:

- CWD-relative path to the plugin file
- NPM package name
- An plugin attacher function
- A tuple of path / attacher function and configuration object

```js
{
  plugins: [
    './my-plugins/status-plugin.js', // relative path

    require('fractalite-special-plugin'), // exports attacher function

    ['./my-plugins/another-plugin', {
      foo: 'bar'
    }], // [path, opts] tuple

    ['yet-another-plugin', {
      baz: 'boop'
    }] // [package-name, opts] tuple
  ];
}
```

### Render engine

The default [Nunjucks](https://mozilla.github.io/nunjucks/) render engine can be overridden using the `engine` config property.

The engine can be specified as one of:

- CWD-relative path to the engine file
- NPM package name
- An engine attacher function
- A tuple of path / attacher function and configuration object

```js
{
  engine: './my-engines/mustache.js' // CWD-relative path
}
// or
{
  engine: require('another-engine') // Exported attacher function
}
// or
{
  engine: ['./my-engines/mustache.js', {
    tags: ['<%', '%>']
  }] // [path, opts] tuple
}
// or
{
  engine: ['another-engine', {
    tags: ['<%', '%>']
  }] // [package-name, opts] tuple
}
```

### UI configuration

Configuration for the UI generator can be provided under the `ui` key. Typical options include:

`ui.theme`: The UI theme to use, specified as a CWD-relative path to a local theme directory or as an NPM package name

```js
// config.fractal.js
{
  ui: {
    theme: '@fratalite/theme-workbench'
  }
}
```

*More options to be specified.*
