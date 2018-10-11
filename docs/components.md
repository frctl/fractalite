# Components

## File structure

Components live in the `src` directory and consist of a directory with one or more files in it.

The root directory _must_ have a name that begins with an `@` symbol - for instance `@button` or `@media-block`.

At a minimum, components will typically contain:

- A **view** template, named `view.<ext>` where `<ext>` is the file extension for the desired template render engine - for example `view.njk`
- A **component configuration** file, typically called `config.js` or `<component-name>.config.js`.

Components can additionally contain any other related files such as styleheets, scripts, images etc, as required.

## Configuration files

Component configuration files can be formatted as `JSON`, `YAML` or as an ES6 module that exports a configuration object. Additionally, configuration can also be provided within a special key in the `package.json` file within the component directory.

It's strongly recommended to configure components using the ES6 module format as this offers many advantages of the static `JSON` or `YAML` formats.

A typical config file would look like:

```js
// @button/button.config.js

module.exports = {
  label: 'Basic Button'
  //... more config here
};
```

### Config properties

* `label` (string): Overrides the generated human-readable label
* `variants` (array): List of pre-defined component variants

### Require aliases

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
