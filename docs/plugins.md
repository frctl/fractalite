# Parser plugins

The Fractalite parser goes through the following steps:

1. Reads the files in the `src` directory, turns it into a list of file objects.
2. Transforms the files into an array of component objects according to the component structure specification.
3. Runs those objects through a pipeline of plugins to mutate the component objects as required.
4. Returns the final component objects to be used as data in the UI themes, CLI commands or any other tools building on the core parser.

A simple parser plugin looks like this:

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

Plugin files must export a named 'attacher' function that returns the (optionally asynchronous) plugin handler function itself.

The handler will receive an `array` of components as its first argument and must return the manipulated array for the next plugin to operate on.

Run-time options (that are passed to the attacher function) can be provided when the plugin is added in the project configuration file.

The [`packages/core/src/plugins`](packages/core/src/plugins) directory contains the core plugins that are used by the parser and may be useful for reference.
