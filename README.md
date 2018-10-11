# Fractalite

Experimental, stripped-down version of [Fractal](https://fractal.build), featuring:

- rationalised component specification
- plugin-based component parser
- declarative CLI configuration
- customisable, theme-driven UI builder

## Key concepts

### Component structure

Components live in the `src` directory and consist of a directory with one or more files in it. The root directory _must_ have a name that begins with an `@` symbol - for instance `@button` or `@media-block`.

At a minimum, components will typically contain:

- A **view** template, named `view.<ext>` where `<ext>` is the file extension for the desired template render engine - for example `view.njk`
- A **component configuration** file, typically called `config.js` or `<component-name>.config.js`.

Components can additionally contain any other related files such as styleheets, scripts, images etc, as required.

### Component configuration

Component configuration can be formatted as `JSON`, `YAML` or as a JavaScript object `exported` as Node module. Additionally, configuration can also be provided within a `package.json` file within the component directory.

It's strongly recommended to configure components using Javascript as this offers many advantages of the static `JSON` or `YAML` formats. A typical JS config file would look like:

```js
// @button/button.config.js

module.exports = {
  label: 'Basic Button'
  //... more config here
};
```

#### Configuration properties

*To be specified*

#### Require aliases

Fractalite supports **Webpack-style `require` aliasing** within component configuration files. This means that full `require` paths do not need to be hard-coded into individual configuration files and allowing global data objects or helper functions to be shared between components.

```js
// @button/button.config.js
const sharedData = require('~/data/shared'); // '~' alias maps to the CWD

module.exports = {
  label: sharedData.buttonLabel;
  //... more config here
};
```

User-defined aliases can be added as required into the project configuration file.

### Parser plugins

The Fractalite parser reads the files in the `src` directory, builds an array of component objects according to the component structure specification and then runs those objects through a pipeline of plugins to transform the component objects as required.

Plugins consist of an exported 'attacher' function that will receive an `options` object and that returns the (optionally asynchronous) plugin handler function itself. The plugin will receive an `array` of components as its first argument and must return the manipulated array for the next plugin to operate on.

```js
// status-plugin.js

module.exports = function statusPlugin(opts = {}) {
  return function handler(components) {
    for (const component of components) {
      component.status = Math.random() > 0.5 ? 'ready' : 'prototype';
    }
    return components;
  };
};
```

The [`packages/core/src/plugins`](packages/core/src/plugins) directory contains the core plugins that are used by the parser.

### Render engines

Render engines are use to render component view templates. They follow a similar format to plugins, exporting a configurable 'attacher' function that returns the (optionally asynchronous) render function itself.

A basic [Mustache](https://github.com/janl/mustache.js/) render engine could be implemented as follows:

```js
// mustache-engine.js
const Mustache = require('mustache');

module.exports = function mustache(opts = {}) {
  Mustache.tags = opts.tags || ['{{', '}}'];
  return function render(str, context = {}) {
    return Mustache.render(str, context);
  };
};
```

### UI Generator

Fractalite provides a UI generator package that is built upon and extends the core parser functionality. It allows creation of powerful, theme0-based interfaces for developing and documenting your component library.

#### Themes

Two core themes are currently in development:

- **Workbench** - a VueJS-based development theme for fast previewing and debugging of components
- **Styleguide** - A classic 'styleguide' theme for browsing components, variants and their related files and information.

The [demo](#running-the-demo) provides examples of each of these themes in action.

> Themes can be customised on a per-project basis or extended and shared across projects as NPM packages.

#### Dev / Build modes

The UI generator can be run in one of two modes:

- `dev`: Development mode, starts a local server and provides on-demand rebuilding of pages.
- `build`: Generates a static version of the site, suitable for distribution and hosting.


### CLI configuration

Project level configuration can be provided to the CLI via a `fractal.config.js` file in the root of the project.

At a minimum a `src` property with the absolute path to the components directory must be provided:

```js
// fractal.config.js
const { resolve } = require('path');

module.exports = {
  src: resolve(__dirname, 'src/components')
};
```

#### Plugins

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

### Template engine

The default [Nunjucks](https://mozilla.github.io/nunjucks/) template engine can be overridden using the `engine` config property.

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

#### UI configuration

Configuration for the UI generator can be provided under the `ui` key. Typical options include:

`ui.theme`: The [UI theme](#ui-themes) to use, specified as a CWD-relative path to a local theme directory or as an NPM package name

```js
// config.fractal.js
{
  ui: {
    theme: '@fratalite/theme-workbench'
  }
}
```

*More options to be specified.*


## Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run bootstrap` - install package-level dependencies, bootstrap packages together

The example project is provided in the `/demo` directory. The dependencies for the demo are bootstrapped as part of the installation process above.

Once installed, `cd demo` to move into the demo directory and then run one of the following commands:

- `npm run workbench:dev` - Start the development server using the **workbench** theme
- `npm run workbench:build` - Build a static version of the **workbench** theme
- `npm run styleguide:dev` - Start the development server using the **styleguide** theme
- `npm run styleguide:build` - Build a static version of the **styleguide** theme
