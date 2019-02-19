## @frctl/fractalite-plugin-assets-bundler

Uses [Parcel](https://parceljs.org) to handle asset bundling for Fractal component libraries.

**1. Install in your project:**

```bash
npm i --save-dev @frctl/fractalite-plugin-assets-bundler
```

**2. Add plugin to Fractal config file: **

```js
// fractal.config.js
module.exports = {
  // ...  
  plugins: [
    require('@frctl/fractalite-plugin-assets-bundler')({
      entryFile: './src/preview.js',
      outFile: './dist/build.js'
    })
  ]
};
```

**3. Create entry file:**

```js
// ./assets/preview.js
import '../components/**/*.scss'
import button from '../components/@button/button.js'
```

> See the Parcel docs on module resolution for more info on paths, globbing and aliases: https://parceljs.org/module_resolution.html

**4. View your components...**

The asset bundler handles serving assets and injecting them into your component previews so no further configuration is needed.
