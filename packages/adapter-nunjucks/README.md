## @frctl/fractalite-adapter-nunjucks

A Nunjucks template engine adapter for the Fractalite prototype.

### Installation

`npm i @frctl/fractalite-adapter-nunjucks`

Specify as adapter in the project config file:

```js
// fractal.config.js
module.exports = {
  adapter: require('@frctl/fractalite-adapter-nunjucks')({
    // config options here
  })
};
```

### Usage

A Nunjucks view template should be created per component. This should be called `view.njk` or `{component-name}.view.njk`.

```
@button
├── button.config.js
└── view.njk
```

```html
<!-- @button/view.njk -->
<a class="button" href="{{ href }}">
  <span class="button__text">{{ text }}</span>
</a>
```

#### Including child components

The Nunjucks adapter supports importing of child components in templates via the `{% component %}` tag.

```html
{% component 'component-name' %}
{% component 'component-name/scenario-name' %}
{% component 'component-name', props %}
{% component 'component-name/scenario-name', props %}
```

Note that `props` above can be a variable or an inline-object of property values.

If a scenario name *and* props are specified then the two objects are merged.
