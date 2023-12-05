const MarkdownIt = require('markdown-it');

/**
   * parseMarkdown
   * @param {string} text 
   * @returns {string} Parsed text.
   */
function MarkdownParse (text) {
    // Create MarkdownIt object.
    const markdown = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    // Return Markdown rendered text.
    return markdown.renderInline(text);
  }
