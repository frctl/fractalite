# Fractalite

A prototype to help explore future development ideas for [Fractal](https://fractal.build).

## Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run demo` - bootstrap packages together and start the default demo server
4. Point a browser at http://localhost:3030 to view the Fractal UI.

## Usage / info

* [Project Configuration](#project-configuration)
* [Components](#components)
* [Plugins](#plugins)
* [API](#api)

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

The Nunjucks demo contains a [annotated example](demos/nunjucks/fractal.config.js) of a project configuration file that contains more detail on the available options.

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

### Config files

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

See the demo button component for an [annotated example](demos/nunjucks/src/components/01-units/@button/button.config.js) of some of the available config options.

### View templates

View templates are **template-engine specific** files that contain the code required to render the component.

Fractalite **adapters** are responsible for determining how view templates are named, rendered and for any other framework/engine related integration details.

However, in the case of 'simple' template engines such as Nunjucks or Handlebars, views are typically templated fragments of code as in the following (Nunjucks) example:

```html
<!-- @button/view.njk -->
<a class="button" href="{{ href }}">
  <span class="button__label">{{ label }}</span>
</a>
```

More complex frameworks such as Vue or React may have different requirements and feature support will be determined by the adapter used.

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

## API

## Compiler

#### `compiler.use(fn)`

Push a compiler middleware function onto the stack.

Middleware receive the `components` array as the first argument, and a Koa-style `next` function as the second argument.

Middleware can mutate the contents of the components array as needed. Unlike in Koa middleware The `next` function only needs to be called if the middleware should wait for latter middleware to complete before running.

```js
// 'plain' middleware, no awaiting
compiler.use(components => {
  components.forEach(component => {
    // do something
  })
})
```

```js
// middleware that waits for latter middleware to complete first
compiler.use(async (components, next) => {
  await next();
  components.forEach(component => {
    // do something
  })
})
```

#### `compiler.getState()`

Returns an object representing the current state of the compiler. By default this includes `components` and `files` properties.

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
