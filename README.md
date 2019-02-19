# Fractalite

A prototype to help explore future development ideas for [Fractal](https://fractal.build).

## Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run demo` - bootstrap packages together and start the demo server

## Overview

### Project Configuration

Fractalite config is kept in a `fractal.config.js` file in the root of the project directory:

```js
// fractalite.config.js
const { resolve } = require('path');

module.exports = {
  components: resolve(__dirname, './src/components'),
  // ... other config setting here
};
```

The Nunjucks demo contains a [annotated example](demos/nunjucks/fractal.config.js) of a project configuration file.
