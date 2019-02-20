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
        label: 'Next',
        modifier: 'action',
        icon: './arrow-right.svg', // component-relative file paths are automatically converted to URLs
        iconPos: 'after'
      }
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
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
          label: 'Back'
        },
        {
          label: 'A prev button with a long label'
        }
      ]
    }
  ],

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
  }
};
