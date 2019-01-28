// Based on https://github.com/zephraph/nunjucks-markdown

const { SafeString } = require('nunjucks').runtime;

module.exports = function Render() {
  this.tags = ['render'];

  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();

    // Parse the tag and collect any arguments
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // If arguments, return the fileTag constructed node
    if (args.children.length > 0) return new nodes.CallExtensionAsync(this, 'fileTag', args);

    // Otherwise parse until the close block and move the parser to the next position
    const body = parser.parseUntilBlocks('endrender');

    // I found Nunjucks  to be incredibly convoluted on how to just get some data into the BlockTag function,
    // this finally worked by faking another template node.
    const tabStart = new nodes.NodeList(0, 0, [
      new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, tok.colno - 1)])
    ]);

    parser.advanceAfterBlockEnd();

    // Return the constructed blockTag node
    return new nodes.CallExtensionAsync(this, 'blockTag', args, [body, tabStart]);
  };

  this.fileTag = function(environment, file, done) {
    environment.env.render(file, environment.ctx, done);
  };

  this.blockTag = function(environment, body, tabStart, done) {
    environment.env.renderString(body(), environment.ctx, (err, html) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, new SafeString(html));
    });
  };
};
