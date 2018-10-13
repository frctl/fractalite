// Based on https://github.com/zephraph/nunjucks-markdown

const { SafeString } = require('nunjucks').runtime;
const stripIndent = require('strip-indent');

module.exports = function Markdown(ui) {
  this.tags = ['markdown'];

  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();

    // Parse the markdown tag and collect any arguments
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // If arguments, return the fileTag constructed node
    if (args.children.length > 0) return new nodes.CallExtensionAsync(this, 'fileTag', args);

    // Otherwise parse until the close block and move the parser to the next position
    const body = parser.parseUntilBlocks('endmarkdown');

    // I found Nunjucks  to be incredibly convoluted on how to just get some data into the BlockTag function,
    // this finally worked by faking another template node.
    const tabStart = new nodes.NodeList(0, 0, [
      new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, tok.colno - 1)])
    ]);

    parser.advanceAfterBlockEnd();

    // Return the constructed blockTag node
    return new nodes.CallExtensionAsync(this, 'blockTag', args, [body, tabStart]);
  };

  // Markdown rendering for the file tag. Use the nunjucks.render function to render
  // the actual contents of the file. Pass the results through the markdown renderer.
  this.fileTag = async function(environment, file, done) {
    const { engine } = ui;
    try {
      const html = await engine.render(file, environment.ctx, { markdown: true });
      done(null, new SafeString(html));
    } catch (err) {
      done(err);
    }
  };

  // Markdown rendering for the block. Pretty simple, just get the body text and pass
  // it through the markdown renderer.
  this.blockTag = async function(environment, body, tabStart, done) {
    const { engine } = ui;
    const str = stripIndent(body());
    try {
      const html = await engine.renderMarkdownString(str);
      done(null, new SafeString(html));
    } catch (err) {
      done(err);
    }
  };
};
