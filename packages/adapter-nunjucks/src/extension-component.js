const { SafeString } = require('nunjucks').runtime;
const { mergeProps, getTarget, getComponentFromVariant, isVariant } = require('@fractalite/core/helpers');

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

    const target = getTarget(state, handle, true);
    const component = isVariant(target) ? getComponentFromVariant(state, target) : target;

    props = shouldMerge === false ? props : mergeProps(state, handle, props);

    env.render(component.handle, props, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, new SafeString(result));
    });
  }
};
