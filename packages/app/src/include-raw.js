const { SafeString } = require('nunjucks').runtime;

module.exports = class IncludeRawExtension {
  constructor() {
    this.tags = ['includeraw'];
  }

  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args, null);
  }

  run(ctx, name, ...args) {
    const { env } = ctx;
    const done = args.pop();

    env.getTemplate(name, false, (err, tpl) => {
      if (err) return done(err);
      done(null, new SafeString(tpl.tmplStr));
    });
  }
};
