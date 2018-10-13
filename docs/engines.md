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

### Rendering sub-components

You can render sub-components in a component view template using the custom `render` tag:

```twig
{% render '@button' %}
```

To render the component with some **context data**, supply it as the second argument to the tag:

```twig
{% render '@button', { label: 'Click here', icon: 'next' } %}
```

To render a **variant**, supply the variant name as part of the `@name` argument:

```twig
{% render '@button/next' %}
```

> Unlike when rendering a component, rendering a variant will **automatically** use any context data defined for that variant in the component config file.

Suppying a **second argument** when rendering a variant will **merge** the context data from the variant config with the provided data object:

```twig
{% render '@button/next', { label: 'Go next' } %}
```

### Including view templates from other components

The regular [`{% include %}`](https://mozilla.github.io/nunjucks/templating.html#include) and [`{% extends %}`](https://mozilla.github.io/nunjucks/templating.html#extends) Nunjucks tags can be used with `@component` names to conveniently include (or extend) the view template of any other component.

```twig
{% include '@button' %} <!-- include the view.njk template from the 'button' component -->
```

> The `include` (or `extend`) tag works exactly the same way as it does in regular Nunjucks templates - the '@component' syntax is just convenient reference to the component view file.
