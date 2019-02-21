# Fractalite

A prototype to help explore future development ideas for [Fractal](https://fractal.build).

## Demo

The most full-featured demo is the [Nunjucks demo](demos/nunjucks). It uses the [Nunjucks adapter](packages/adapter-nunjucks) and the [Asset Bundler](packages/plugin-assets-bundler) plugin.

> The source code for the Nunjucks demo contains commented examples of some of the main features of this prototype and is worth browsing in conjunction with the web UI.

### Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run demo` - bootstrap packages together and start the default demo server
4. Point a browser at http://localhost:3030 to view the Fractal UI.

### Other demos

* [Vue demo](demos/vue) - Basic proof-of-concept, client-side rendered Vue integration. `npm run demo:vue`

## Usage / info

* [Project Configuration](#project-configuration)
* [Components](#components)
  * [Scenarios](#scenarios)
  * [Configuration](#configuration)
  * [View templates](#view-templates)
* [Plugins](#plugins)
  * [Example plugin - author info](#example-plugin-author-info)
  * [Assets bundler plugin](#assets-bundler-plugin)
* [API](#api)
  * [Compiler](#compiler)
  * [Application](#application)
  * [Renderer](#renderer)

## Project Configuration

Fractalite config is kept in a `fractal.config.js` file in the project root directory. Only the `components` property is required.

```js
// fractal.config.js
const { resolve } = require('path');

module.exports = {
  // absolute path to the components directory
  components: resolve(__dirname, './src/components'),
};
```

> The Nunjucks demo contains a [annotated example](demos/nunjucks/fractal.config.js) of a project configuration file that contains more detail on the available options.

## Components

Each component is represented by a directory. The directory name must begin with an `@` symbol - for example `@button` or `@media-block`.

Each component directory will typically contain a set of files including as component config file, a view template file (or the framework-specific equivalent) and any other related assets.

The file structure for a basic [Nunjucks](https://mozilla.github.io/nunjucks) button component might look something like this:

```
@button
├── button.config.js
├── button.css
└── view.njk
```

### Scenarios

**Component scenarios** are a key concept in Fractalite.

A scenario provides an example implementation of the component by supplying a set of properties to render the component with.

> Scenarios are very similar to the concept of `variants` in Fractal v1, but refined and renamed to better suit the way in which v1 variants have been used in practice. They can also be thought of as similar to the 'story' concept in StorybookJS.

For example, a common use for a `button` component might be as a 'next' control. A simple scenario object representing that might look as follows:

```js
{
  name: 'next', // reference name
  label: 'Next step', // display in UI navigation
  props: {
    text: 'Go Next',
    icon: './arrow-right.png'
  }  
}
```

Scenarios are defined in the **component config file**. The Fractalite UI creates a component preview for each scenario defined for that component.

Any relative paths to assets in the scenario `props` object are resolved to full URLs before rendering.

#### Adapter integration

Template engine adapters such as the [Nunjucks adapter](packages/adapter-nunjucks) support including sub-components with scenario properties provided as their default property values:

```html
{% component 'button' %} <!-- include `button` component with no props -->
{% component 'button/next' %}  <!-- include `button` component with props from `next` scenario -->
{% component 'button/next', { text: 'Forwards' } %}  <!-- include `button` component with props from `next` scenario merged with inline props -->
```

### Configuration

Component **config files** can be JSON, YAML or CommonJS module format, although the latter is recommended for flexibility.

Config files must be named `config.{ext}` or `{component-name}.config.{ext}` - for example `button.config.js` or `config.yml`.

CommonJS formatted files should export a configuration object:

```js
// @button/button.config.js
module.exports = {
  label: 'A basic button',
  // other config here...
};
```
#### Config properties

> See the demo button component for an [annotated example](demos/nunjucks/src/components/01-units/@button/button.config.js) of some of the available config options.

**`label`** [string]


The text that should be used to refer to the component in the UI. [_Defaults to a title-cased version of the component name._]

**`scenarios`** [array]

An array of [scenario objects](#scenarios).

```js
module.exports = {
  scenarios: [
    {
      name: 'next',
      props: {
        text: 'Go Next',
        icon: './arrow-right.png'
      }  
    },
    {
      name: 'prev',
      props: {
        text: 'Go Prev',
        icon: './arrow-left.png'
      }  
    }
  ]
}
```

### View templates

View templates are **template-engine specific** files that contain the code required to render the component.

Fractalite **adapters** are responsible for determining how view templates are named, rendered and for any other framework/engine related integration details.

However, in the case of 'simple' template engines such as Nunjucks or Handlebars, views are typically templated fragments of HTML as in the following (Nunjucks) example:

```html
<!-- @button/view.njk -->
<a class="button" href="{{ href }}">
  <span class="button__text">{{ text }}</span>
</a>
```

More complex frameworks such as Vue or React may have different requirements and feature support will be determined by the adapter used.

#### Linking to assets in view templates

Referencing local component assets in view templates can be done via relative paths:

```
@button
├── next-arrow.png
└── view.njk
```

```html
<!-- view.njk -->
<img src="./next-arrow.png">
```

Any relative paths in [html attributes that expect a URL value](https://www.npmjs.com/package/html-url-attributes) will be dynamically rewritten to reference the asset correctly.

## Plugins

Plugins the primary way that the Fractalite app can be customised, and can affect both the UI and the component parsing/compilation process.

A plugin is a function that receives `app`, `compiler` and `renderer` instances as it's arguments.

A useful pattern is to wrap the plugin function itself in a 'parent' function so that it can receive runtime options:

```js
// plugins/example.js
module.exports = function(opts = {}){
  // any plugin initialiation here
  return function(app, compiler, renderer){
    // this is the plugin function itself
    console.log('This is an example plugin');
  }
};
```

Plugins are added in the project config file:

```js
// fractal.config.js
module.exports = {
  plugins: [
    require('./plugins/example')({
      // customisation opts here
    })
  ]
};
```

### Example plugin - author info

The following is an example of a fairly basic plugin that reads author information from component config files and adds a tab to the component inspector UI to display this information.

```js
// plugins/author-info.js
module.exports = function(opts = {}) {
  return function authorPlugin(app, compiler) {

    const authorDefaults = {
      name: 'Unknown Author',
      email: null
    };

    /*
     * First add a compiler middleware function
     * to extract author info from the component config
     * and create a .author property on the component
     * object with a normalized set of properties.
     */
    compiler.use(components => {
      components.forEach(component => {
        const authorConfig = component.config.author || {};
        component.author = { ...authorDefaults, ...authorConfig };
      });
    });

    /*
     * Then add an inspector panel to display the
     * author information in the UI. The panel templates
     * are rendered using Nunjucks and have access to the
     * current component, scenario and compiler state.
     */
    app.addInspectorPanel({
      name: 'component-author',
      label: 'Author Info',
      template: `
         <div class="author-panel">
           <h3>Author information</h3>
           <ul>
             <li><strong>Name:</strong> {{ component.author.name }}</li>
             {% if component.author.email %}
             <li><strong>Email:</strong> {{ component.author.email }}</li>
             {% endif %}
           </ul>
         </div>
       `
    });

    /*
     * Finally add some basic CSS to style the author panel.
     */
    app.addCSS(`
       .author-panel {
         padding: 20px;
       }
       .author-panel ul {
         margin-top: 20px;
       }
     `);
  };
};
```
Author information can then be added to component config files and will be displayed in the UI:

```js
// @button/button.config.js
module.exports = {
  author: {
    name: "Daffy Duck",
    email: 'daffy@duck.com'
  }
}
```

> Note that in the simple example above the compiler middleware could have been skipped in favour of a little more verbosity in the template. In more complex real-world examples however this is not always the case.

### Assets bundler plugin

The [asset bundler plugin](packages/plugin-assets-bundler) uses [Parcel](https://parceljs.org) to provide a zero-config asset bundling solution for Fractalite.

It handles asset compilation, hot module reloading (HMR) and automatically adds all generated assets into Fractalite component previews.

First add it to the project config file:

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

Then create the global entry file to bundle the required assets as per your project requirements. An example might look like this:

```js
// ./assets/preview.js
import '../components/**/*.scss'
import button from '../components/@button/button.js'
```

> See the Parcel docs on module resolution for more info on paths, globbing and aliases: https://parceljs.org/module_resolution.html

#### Dynamic entry file building

The asset bundler also support dynamic creation of the entry file using the `entryBuilder` config option.

The entry builder will be re-run whenever changes are made to the components directory.

```js
const { relative } = require('path');

const bundlerPlugin = require('@frctl/fractalite-plugin-assets-bundler')({

  /*
   * The entryBuilder function receives state and context
   * objects and should return a string of the entry file contents.
   *
   * This example dynamically build an entry file that imports all
   * css files from components.
   */
  entryBuilder(state, ctx) {
    let entry = '';
    state.files.filter(f => f.ext === '.scss').forEach(file => {
      entry += `import '${relative(ctx.dir, file.path)}'\n`; // import paths need to be relative to the ctx.dir property
    });
    return entry;
  },

  // entry and out files must still be specified
  entryFile: './src/preview.js',
  outFile: './dist/build.js'
})
```

## API

## Compiler

#### `compiler.use(fn)`

Push a compiler middleware function onto the stack.

Middleware receive the `components` array as the first argument, and a Koa-style `next` function as the second argument.

Middleware can mutate the contents of the components array as needed. Asynchronous middleware is supported.

**Unlike in Koa middleware** the `next` function _only_ needs to be called if the middleware should wait for latter middleware to complete before running.

```js
// 'plain' middleware, no awaiting
compiler.use(components => {
  components.forEach(component => {
    // ...
  })
})

// 'asynchronous' middleware
compiler.use(async components => {
  await theAsyncTask();
  components.forEach(component => {
    // ...
  })
})

// middleware that waits for latter middleware to complete first
compiler.use(async (components, next) => {
  await next();
  components.forEach(component => {
    // ...
  })
})
```

#### `compiler.getState()`

Returns an object representing the current state of the compiler. By default this includes `components` and `files` properties.

```js
const state = compiler.getState();

state.components.forEach(component => {
  console.log(component.name);
});

state.files.forEach(component => {
  console.log(component.path);
});
```

#### `compiler.parse()`

Re-parse the component directory and update the internal compiler state. Returns a Promise that resolves to a state object.

## Application

### Properties

#### `app.mode`
#### `app.router`
#### `app.views`

### UI

#### `app.addInspectorPanel(props)`
#### `app.getInspectorPanels()`
#### `app.removeInspectorPanel(name)`

### Previews

#### `app.addPreviewStylesheet(url, [path])`
#### `app.addPreviewScript(url, [path])`
#### `app.addPreviewCSS(css)`
#### `app.addPreviewJS(js)`
#### `app.beforeScenarioRender(fn)`
#### `app.afterScenarioRender(fn)`
#### `app.beforePreviewRender(fn)`
#### `app.afterPreviewRender(fn)`

### Routing

#### `app.addRoute(name, path, handler)`
#### `app.url(name, params)`

### Lifecycle

#### `app.beforeStart(fn)`
#### `app.on(event, handler)`
#### `app.emit(event, [...args])`

### Views

#### `app.addViewPath(path)`
#### `app.addViewExtension(name, ext)`
#### `app.addViewFilter(name, filter)`
#### `app.addViewGlobal(name, value)`

### Assets

#### `app.addStylesheet(url, [path])`
#### `app.addScript(url, [path])`
#### `app.addCSS(css)`
#### `app.addJS(js)`
#### `app.addStaticDir(name, path, [mount])`
#### `app.serveFile(url, path)`

### Utils

#### `app.utils.renderMarkdown(str)`
#### `app.utils.highlightCode(code)`
#### `app.utils.parseFrontMatter(str)`
#### `app.utils.renderPage(str, [props], [opts])`
#### `app.utils.addReferenceLookup(key, handler)`

### Other

#### `app.extend(methods)`

## Renderer

#### `renderer.render(component, props)`
#### `renderer.renderAll(component, arrayOfProps)`
