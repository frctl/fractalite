const { SafeString } = require('nunjucks').runtime;

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

  run(nunjucksContext, name, ...args) {
    const { env } = nunjucksContext;
    const callback = args.pop();
    let props = args.shift() || {};
    const shouldMerge = args.shift();
    const { api } = env;

    const component = api.getComponent(name);

    props = shouldMerge === false ? props : api.mergeProps(name, props);

    env.render(component.name, props, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, new SafeString(result));
    });
  }
};
