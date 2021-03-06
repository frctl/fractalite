module.exports = {
  /*
   * Component `scenarios` are very similar to `variants` in
   * Fractal v1. They define a set of named component instances
   * that are then displayed in the UI.
   */
  scenarios: [
    {
      name: 'next',
      /*
       * The `props` object is similar to `context` in Fractal v1
       * Properties defined here are passed to the template engine adapter
       * when the component is being rendered.
       */
      props: {
        text: 'Next',
        modifier: 'action',
        icon: './arrow-right.svg', // Component-relative file paths are automatically converted to URLs
        iconPos: 'after'
      }
    },
    {
      name: 'prev',
      props: {
        text: 'Prev',
        modifier: 'action',
        icon: './arrow-left.svg',
        iconPos: 'before'
      },
      /*
       * Multiple scenario instances can be rendered in the same preview
       * by providing an array of props for the `preview` option.
       * Each preview props object will be merged with the default scenario
       * props defined above.
       */
      preview: [
        {
          text: 'Back'
        },
        {
          text: 'A prev button with a long label'
        }
      ]
    }
  ],

  /*
   * Configure the component's search behaviour.
   *
   * The `aliases` array is a list of extra strings to match against.
   * `hidden: true` can be used to prevent the component from
   * being matched in the search results.
   */
  search: {
    aliases: ['clicker']
  },

  /*
   * The component preview option lets users customise
   *  previews on a per-component basis.
   */
  preview: {
    /*
     * The wrap() method allows wrapping of the entire rendered
     * output in arbitary HTML.
     */
    wrap(html, { scenario, component }) {
      return `<div>
        <h4 class="preview-title">${component.label} / ${scenario.label}</h4>
        ${html}
      </div>`;
    },

    /*
     * The wrapEach() method allows wrapping of each scenario instance
     * within the preview window. Only applicable when defining multiple
     * scenario preview instances such as in the `prev`scenario above.
     */
    wrapEach(html) {
      return `<div class="preview-instance">${html}</div>`;
    },

    /*
     * Preview-specific scripts can be added here.
     * These can also be specified globally instead of on
     * a per-component basis if required.
     */
    js: `console.log('This is one way to inject preview-specific JS');`,

    /*
     * Preview-specific styles can be added here.
     * These can also be specified globally instead of on
     * a per-component basis if required.
     */
    css: `
      .preview-title {
        color: #aaa;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .preview-instance {
        margin-bottom: 10px;
      }
    `
  },

  /*
   * The notes property is used by the Notes plugin. Any text here will
   * be rendered in a custom notes panel in the inspector.
   */
  notes: `
    Some notes on the button component.

    These were added inline in the [button config file]({file:button/button.config.js})
  `
};
