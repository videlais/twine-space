// Require AFrameProxy
const AFrameProxy = require('./aframe-build/AFrameProxy.js');

/**
 * Rules for unescaping and parsing author content from passages
 *  into visual effects and content for readers.
 *
 * @class Markdown
 */
class Markdown {
  /**
   * Parse text. Convert authored markdown symbols into
   *  visual effects and content for readers.
   *
   * @function parse
   * @param {string} text - Text to parse
   * @returns {string} Parsed text
   * @static
   */
  static parse (text) {
    // Remove any a-scene elements, if they exist
    AFrameProxy.removeScene();

    const rules = [
      // [[rename|destination]]
      [/\[\[(.*?)\|(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[rename->dest]]
      [/\[\[(.*?)->(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[dest<-rename]]
      [/\[\[(.*?)<-(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$2</tw-link>'],
      // [[destination]]
      [/\[\[(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$1</tw-link>'],
      // (entity:attributes)
      [/\((.*?):(.*?)\)/g, (match, entity, attributes) => {
        AFrameProxy.createScene();
        AFrameProxy.add(entity, attributes);
        return '';
      }],
      // Break Rule
      [/[\r\n\n]/g, '<br>']
    ];

    rules.forEach(([rule, template]) => {
      text = text.replaceAll(rule, template);
    });

    return text;
  }

  /**
   * Unescape content.
   *
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
