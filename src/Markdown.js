const MarkdownIt = require('markdown-it');
const BabylonProxy = require('./BabylonProxy.js');

const markdownOption = {
  html: true,
  linkify: true,
  typographer: true
};

const markdown = new MarkdownIt(markdownOption);

/**
 * Rules for un-escaping and parsing author content from passages
 * into visual effects and content for readers.
 * @class Markdown
 */
class Markdown {
  /**
   * Parse text. Convert authored markdown symbols into
   * visual effects and content for readers.
   * @function parse
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text.
   * @static
   */
  static parse (text) {
    // Rules for translation.
    const rules = [
      // [[rename|destination]]
      [/\[\[(.*?)\|(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[rename->dest]]
      [/\[\[(.*?)->(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[dest<-rename]]
      [/\[\[(.*?)<-(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$2</tw-link>'],
      // [[destination]]
      [/\[\[(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$1</tw-link>'],
      // Break Rule
      [/[\r\n\n]/g, '<br>'],
      // Test macro
      [/\(test:\)/gm, () => {
        BabylonProxy.createScene();
        BabylonProxy.addToScene();
        return '';
      }]
    ];

    rules.forEach(([rule, template]) => {
      text = text.replace(rule, template);
    });

    // Return Markdown rendered text.
    return markdown.renderInline(text);
  }

  /**
   * Unescape content.
   * @function unescape
   * @param {string} text - Text to unescape
   * @returns {string} - Unescaped text
   * @static
   */
  static unescape (text) {
    const unescapeSequences = [
      ['&amp;', '&'],
      ['&lt;', '<'],
      ['&gt;', '>'],
      ['&quot;', '"'],
      ['&#x27;', "'"],
      ['&#x60;', '`']
    ];

    unescapeSequences.forEach(([rule, template]) => {
      text = text.replaceAll(rule, template);
    });

    return text;
  }
}

module.exports = Markdown;
