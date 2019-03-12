## @frctl/fractalite-adapter-twig

### Installation

`npm i @frctl/fractalite-adapter-twig`

Specify as adapter in the project config file:

```js
// fractal.config.js
module.exports = {
  adapter: require('@frctl/fractalite-adapter-twig')({
    cache: '/path/to/template/cache/dir' // optional 
  })
};
```

### Usage

A Twig view template should be created per component. This should be called `view.twig` or `{component-name}.view.twig`.

```
button
├── button.config.js
└── view.twig
```

```html
<!-- button/view.twig -->
<a class="button" href="{{ href }}">
  <span class="button__text">{{ text }}</span>
</a>
```

#### Include/extend/import

Templates from other components can be included/extended/imported as required. You can either reference a view template via the component name:

```
{% include 'button' with someData %}
```

Or via the path to the component view template itself (relative to the components directory root):

```
{% include 'relative/path/to/button/view.twig' with someData %}
```

> The latter option is less flexible and robust (it will need to be updated if components are moved around) but can make integration with PHP environments more straightforward.
