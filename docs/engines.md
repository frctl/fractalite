# Render engines

Render engines are use to render component view templates. The default render engine is for [Nunjucks](https://mozilla.github.io/nunjucks/) templates.

Render engines follow a similar format to plugins, exporting a configurable 'attacher' function that returns the (optionally asynchronous) render function itself.

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

## Nunjucks render engine

The default [Nunjucks](https://mozilla.github.io/nunjucks/) render engine supports all standard Nunjucks functionality, with a few tweaks to make building components easier.

<!-- ### Referencing component views

If you wish to `include` or `extend` another component's -->
