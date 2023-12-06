import MarkdownIt from 'markdown-it';

/**
  * ParseMarkdown
  * @param {string} text 
  * @returns {string} Parsed text.
  */
export default function ParseMarkdown (text) {
    // Create MarkdownIt object.
    const markdown = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });

    // Return Markdown rendered text.
    return markdown.renderInline(text);
}
