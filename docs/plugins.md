# Parser plugins

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
