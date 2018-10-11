const { SafeString } = require('nunjucks').runtime;
const { defaultsDeep } = require('@fractalite/support/utils');
const { parseHandle } = require('@fractalite/support/helpers');

module.exports = class RenderExtension {
  constructor() {
    this.tags = ['render'];
  }

  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args, null);
  }

  run(ctx, name, ...args) {
    const { env } = ctx;
    const callback = args.pop();
    let context = args.shift() || {};
    const shouldMerge = args.shift();
    const nameParts = parseHandle(name);

    const component = env.state.components.find(c => c.name === nameParts.component);
    if (!component) {
      return callback(new Error(`[extension:render] Component '${nameParts.component}' not found`));
    }

    const { variants } = component;
    if (nameParts.variant) {
      const variant = variants.find(v => v.name === nameParts.variant);
      if (!variant) {
        return callback(
          new Error(
            `[extension:render] Variant '${nameParts.variant}' of component '${
              nameParts.component
            }' not found`
          )
        );
      }
      context = shouldMerge === false ? context : defaultsDeep(context, variant.context);
    }

    env.render(nameParts.component, context, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, new SafeString(result));
    });
  }
};
