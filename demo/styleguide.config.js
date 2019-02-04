const { resolve } = require('path');

module.exports = {
  title: 'Styleguide',

  adapter: require('../packages/adapter-nunjucks')(),

  components: {
    src: resolve(__dirname, './src/components')
  },

  assets: resolve(__dirname, './dist/assets'),

  // develop: {
  //   port: 3030
  // },
  //
  // build: {},

  opts: {
    nav: {},
    // notes: false,
    pages: {
      src: resolve(__dirname, './src/pages'),
      indexLabel: 'Overview'
    },
    inspector: {},
    fileRefs: {
      // relative: true
    },
    // relativeUrls: true,
    preview: {
      scripts: [],
      stylesheets: ['main.css']
    }
  },

  init(app) {
    // Example compiler middleware to read notes from notes.md files
    app.compiler.use(async ({ components }) => {
      await Promise.all(
        components.map(async component => {
          const notesfile = component.files.find(
            file => file.basename.toLowerCase() === 'notes.md'
          );
          if (notesfile) {
            component.notes = await notesfile.getContents();
          }
        })
      );
    });
  }
};
