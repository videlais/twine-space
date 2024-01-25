import MarkdownIt from 'markdown-it';

/**
  * parse - parses Markdown into HTML on a per-line basis. It will not generate paragraph encloser of content.
  * 
  * To avoid type issues, this function will force conversion of the input into a string.
  * 
  * @example
  * `*foo*`
  * // Returns `<em>foo</em>`
  * 
  * `**foo**`
  * // Returns `<strong>foo</strong>`
  * 
  * @function parse
  * @param {string} text - Text containing Markdown.
  * @returns {string} Parsed text.
  */
function parse (text) {

  // Test if text is a string.
  if(typeof text !== 'string') {
    // Force conversion to string.
    text = String(text);
  }

    // Create MarkdownIt object.
    const markdown = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });

    // Return Markdown rendered text.
    return markdown.renderInline(text);
}

export { parse };
