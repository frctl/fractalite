const { SafeString } = require('nunjucks').runtime;
const { mergeProps, getComponent, getContext } = require('@fractalite/core/helpers');

module.exports = class ComponentExtension {
  constructor() {
    this.tags = ['component'];
  }

  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args, null);
  }

  run(nunjucksContext, handle, ...args) {
    const { env } = nunjucksContext;
    const callback = args.pop();
    let props = args.shift() || {};
    const shouldMerge = args.shift();
    const { state } = env;

    const [componentName, contextName] = handle.split('/');

    const component = getComponent(state, componentName, true);
    const context = getContext(component, contextName, true);

    props = shouldMerge === false ? props : mergeProps(state, context.props, props);

    env.render(component.name, props, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, new SafeString(result));
    });
  }
};
