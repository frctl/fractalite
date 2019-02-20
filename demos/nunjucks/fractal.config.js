const { resolve } = require('path');

module.exports = {
  /*
   * Project title used in the UI
   */
  title: 'Fractalite Demo',

  /*
   * Template engine adapter
   *
   * Adapters are responsible for implementing component
   * rendering but can also hook into the component compilation
   * and UI preview rendering steps if required.
   */
  adapter: require('@frctl/fractalite-adapter-nunjucks')({
    // adapter options here...
  }),

  /*
   * Absolute path to the components directory.
   *
   * This can also be an array of directory paths and
   * can use glob syntax with negation to exclude certain
   * files from the compiler.
   *
   * `node_modules` directories within the components directory
   * are always ignored.
   */
  components: resolve(__dirname, './src/components'),

  /*
   * Absolute path to the pages directory, if required.
   *
   * Pages are markdown documents that can additionally be
   * run through a Nunjucks renderer to give dynamic access
   * to component information.
   */
  pages: resolve(__dirname, './src/pages'),

  nav: {
    /*
     * Optional navigation generator.
     *
     * If not provided the default navigation structure will be used.
     *
     * The value of the items property can either be an array of navigation
     * items or a function that returns an array of items. The function will
     * be called with a set of entities (such as components and pages) as well
     * as a toTree utility function for converting flat arrays of entities to
     * nav tree structures.
     *
     * Each item in the tree can have the following properties:
     *
     * - `label`: The text displayed for the nav item
     * - `url`: the URL to link to (if not a directory)
     * - `children`: An array of child navigation items
     */
    items({ components, pages }, toTree) {
      return [
        toTree(pages),
        {
          label: 'Components',
          children: toTree(components)
        },
        {
          label: 'External links',
          children: [
            {
              label: 'Github repo &rarr;',
              url: 'http://github.com/frctl/fractalite'
            }
          ]
        }
      ];
    }
  },

  /*
   * Project plugins registry
   *
   * Plugins have full access to both the core component compiler
   * and the UI generator.
   *
   * A plugin is just a function that receives the main application
   * object. Most plugins will additionally wrap this function in another
   * that can accept options for user customisation.
   */
  plugins: [
    /*
     * The asset bundler plugin uses Parcel for zero-config
     * asset bundling and hot module reloading.
     * It also automatically serves bundled assets and
     * adds them to component previews.
     *
     * Whilst sufficient for most projects, those with more complex
     * asset build requirements may choose to use their own asset
     * bundler/development workflow.
     */
    require('@frctl/fractalite-plugin-assets-bundler')({
      entryFile: resolve(__dirname, './src/assets/preview.js'),
      outFile: resolve(__dirname, './dist/assets/build.js')
    }),

    /*
     * Example inline-plugin that adds compiler middleware
     * to read notes from notes.md files.
     */
    function(app, compiler) {
      compiler.use(async components => {
        await Promise.all(
          components.map(async component => {
            const notesfile = component.files.find(file => file.basename.toLowerCase() === 'notes.md');
            if (notesfile) {
              component.notes = await notesfile.getContents();
            }
          })
        );
      });
    }
  ]
};
