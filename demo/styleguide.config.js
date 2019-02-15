const { resolve } = require('path');

module.exports = {
  title: 'Fractalite Demo',

  adapter: require('@fractalite/adapter-nunjucks')(),

  components: resolve(__dirname, './src/components'),
  assets: resolve(__dirname, './dist/assets'),
  pages: resolve(__dirname, './src/pages'),

  preview: {
    stylesheets: ['main.css']
  },

  nav: {
    items({ components, pages, toTree }) {
      return [
        toTree(pages),
        {
          label: 'Components',
          children: toTree(components)
        },
        {
          label: 'Github repo &rarr;',
          url: 'http://github.com/allmarkedup/fractalite'
        }
      ];
    }
  },

  init(app, adapter) {
    // Example compiler middleware to read notes from notes.md files
    app.compiler.use(async ({ components }) => {
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
};
