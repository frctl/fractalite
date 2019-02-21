# Fractalite

A prototype to help explore development ideas for future [Fractal](https://fractal.build) versions.

### Features & status

* Middleware-based components parser/compiler
* Plugin system for compiler and UI customisation
* Adapter-based component rendering
* Dynamic page builder
* Asset bundling via plugin
* Hybrid client/server side-rendered UI (using [Vue](https://vuejs.org))

#### Still missing/in progress...

* [ ] Community feedback and input! :-)
* [ ] Static export builder
* [ ] Proper UI design & implementation
  * [ ] Responsive UI
  * [ ] Loading states
  * [ ] Component search
  * [ ] Collapsible nav
* [ ] Tests
* [ ] Documentation
* [ ] Additional template engine adapters
* [ ] More UI customisation hooks?
* [ ] More extensive feature demo
* [ ] Any other suggestions...?

## Demo

The most full-featured demo is the [Nunjucks demo](demos/nunjucks). It uses the [Nunjucks adapter](packages/adapter-nunjucks) alongside the [Asset Bundler](packages/plugin-assets-bundler) and [Notes](packages/plugin-notes) plugins.

> The source code for the Nunjucks demo contains commented examples of some of the main features of this prototype and is worth browsing in conjunction with the web UI.

### Running the demo

1. Download or clone this repo
2. `npm install` - install top-level dependencies
3. `npm run bootstrap`: bootstrap packages together (may take some time on first run!)
4. `npm run demo` - Start the default demo server
5. Point a browser at http://localhost:3030 to view the Fractal UI.

#### Other demos

* [Vue demo](demos/vue) - Basic proof-of-concept, client-side rendered Vue integration. `npm run demo:vue`

## Usage / info

* [Installation](#installation)
* [Project Configuration](#project-configuration)
* [Components](#components)
  * [Scenarios](#scenarios)
  * [Configuration](#configuration)
  * [View templates](#view-templates)
* [Pages](#pages)
  * [Usage](#pages-usage)
  * [Reference tags](#pages-reference-tags)
  * [Nunjucks templates](#pages-nunjucks-templates)
  * [Front Matter](#pages-frontmatter)
* [Plugins](#plugins)
  * [Example plugin - author info](#example-plugin-author-info)
  * [Assets bundler plugin](#assets-bundler-plugin)
  * [Notes plugin](#notes-plugin)
* [API](#api)
  * [Compiler](#compiler)
  * [Application](#application)
  * [Renderer](#renderer)

## Installation

**Note: Fractalite is not currently published to NPM.** The following steps are for information purposes only until published.

Install via NPM:

```bash
npm i @frctl/fractalite --save-dev
```

Add the following NPM scripts to the project `package.json` file:

```js
{
  "scripts": {
    "start": "fractalite start --port 3333",
    "build": "fractalite build"
  }
}
```

You can now start the Fractalite app by running the `npm start` command from within the project directory.

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

## Pages

Each project can specify a directory of pages to be displayed in the app.

Pages can either be Markdown documents (with a `.md` extension) or Nunjucks templates (with a `.njk` extension) and can define Jekyll-style [front matter](https://jekyllrb.com/docs/front-matter/) blocks for configuration options.

<h3 id="pages-usage">Usage</h3>

Add the absolute path to the pages directory to the project config file:

```js
// fractal.config.js
const { resolve } = require('path');
module.exports = {
  // ...
  pages: resolve(__dirname, './pages'), // absolute path to the pages directory
};
```

Then create the pages:

```
./pages
├── about.njk
└── index.md
```

> If an `index` file (either with `.md` or `.njk` extension) is added in the root of the pages directory then this will override the default application welcome page.

<h3 id="pages-reference-tags">Reference tags</h3>

Reference tags can be used in pages to make linking to other pages, component previews and source files both easier and less fragile. They also allow basic access to properties of page and component objects.

Reference tags take the form `{target:identifier:property}`.

* `target`: one of `component`, `page`, `file`, `inspect` or `preview`
* `identifier`: unique identifier for the target - for example the component name or page handle
* `property`: optional, defaults to `url`  

Some example reference tags:

```html
 <!-- button component inspector URL -->
{inspect:button}

 <!-- standalone preview URL for button component with 'next scenario' -->
{preview:button/next}

 <!-- URL of raw source of the button view template -->
{file:button/view.njk}

<!-- URL of the about page -->
{page:about}

<!-- title of the about page -->
{page:about:title}
```

<h3 id="pages-nunjucks-templates">Nunjucks templates</h3>

Nunjucks templates (pages with a `.njk` extension) have access to the current compiler state properties as well as any data provided in the front matter block:

```html
<!-- about.njk -->
<p>The following components are available</p>
<ul>
  {% for component in components %}
  <li><a href="{{ component.url }}">{{ component.label }}</a></li>
  {% endfor %}  
</ul>
```

<h3 id="pages-frontmatter">Front Matter</h3>

The following page configuration options are available and can be set in a front matter block at the top of pages that require it.

**`title`** [string]

The title displayed at the top of the page.

**`label`** [string]

Used to refer to the page in any navigation

**`handle`** [string]

Used in reference tags to refer to the page. Defaults to the page URL with slashes replaced by dashes.

**`markdown`** [boolean]

Whether or not to run the page contents through the markdown renderer. _[Defaults to `true` for `.md` pages, false for all others.]_

**`template`** [boolean]

Whether or not to run the page contents through the Nunjucks renderer. _[Defaults to `true` for `.njk` pages, false for all others.]_

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
       `,
       css: `
        .author-panel {
          padding: 20px;
        }
        .author-panel ul {
          margin-top: 20px;
        }
      `
    });
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

### Notes plugin

The [notes plugin](packages/plugin-notes) adds a inspector panel to display component notes.

Notes can be defined via the `notes` property in the component config file, or alternatively kept in a markdown file in the component directory.

```js
// fractal.config.js
module.exports = {
  // ...  
  plugins: [
    require('@frctl/fractalite-plugin-notes')({
      notesFile: 'notes.md' // optional, only if notes should be read from files
    })
  ]
};
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
