module.exports = function(opts = {}) {
  return function inspectorInfoPlugin(app) {
    if (opts === false) return;

    const className = 'inspector-panel-info';

    app.addInspectorPanel({
      name: 'info',
      label: opts.label,
      props: { className },
      templateFile: 'plugins/inspector-info',
      css: `
        .${className} {
          padding: 12px;
        }
        .${className}__header {
          display: flex;
          border-bottom: 1px solid #ddd;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .${className}__title {
          font-size: 20px;
        }
        .${className}__proptable a {
          text-decoration: none;
        }
      `
    });
  };
};
