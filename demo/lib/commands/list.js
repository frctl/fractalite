module.exports = function list() {
  return async function(app, args) {
    const { cyan, dim } = this.colours;
    const { components } = await app.init();
    this.br().log(`${components.length} components found:`);
    this.br();
    for (const component of components) {
      this.log(`-- ${cyan(component.label)}  ${dim(component.root.relative)}`);
    }
    process.exit(0);
  };
};

module.exports.description = 'List all components';
