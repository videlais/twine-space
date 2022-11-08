// Require AFrameProxy
const AFrameProxy = require('./AFrameProxy.js');
const $ = require('jquery');
const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
}); ;

/**
 * Rules for un-escaping and parsing author content from passages
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
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text.
   * @static
   */
  static parse (text) {
    // Remove any a-scene elements, if they exist.
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
      // Look for (entity:attributes)[children]
      [/\((.*?):([^>]*?)\)\[([^>]*?)\]/gmi, (match, entity, attributes, children) => {
        let rootParent = null;
        if (entity.toLowerCase() === 'scene') {
          // If we encounter 'a-scene', remove the current one (if it exists)
          $('a-scene').remove();
          // Create a new one with attributes
          $(document.body).append($(`<a-scene ${attributes} />`));
          // Set the parent as new 'a-scene'.
          rootParent = $('a-scene');
        } else {
          rootParent = AFrameProxy.createScene();
        }

        const parentElement = AFrameProxy.add(rootParent, entity, attributes);
        children.replace(/\((.*?):([^>]*?)\)/gmi, (match, entity, attributes) => {
          AFrameProxy.add(parentElement, entity, attributes);
          return '';
        });
        return '';
      }],
      // Look for (entity:attributes)
      [/\((.*?):([^>]*?)\)/gmi, (match, entity, attributes) => {
        // Test for embed-scene.
        if (entity.toLowerCase() === 'embed-scene') {
          // Trim whitespace.
          const trimmedName = attributes.trim();
          // Slice off quotation marks.
          const quoteName = trimmedName.slice(1, trimmedName.length - 1);
          // Attempt to get source.
          const passageSource = window.story.include(quoteName);
          // Append to body.
          $(document.body).append(passageSource);
          // Return empty string.
          return '';
        }
        if (entity.toLowerCase() === 'scene') {
          // If we encounter 'a-scene', remove the current one (if it exists)
          $('a-scene').remove();
          // Create a new one with attributes
          $(document.body).append($(`<a-scene ${attributes} />`));
        } else {
          const rootParent = AFrameProxy.createScene();
          AFrameProxy.add(rootParent, entity, attributes);
          return '';
        }
      }],
      // Break Rule
      [/[\r\n\n]/g, '<br>']
    ];

    rules.forEach(([rule, template]) => {
      text = text.replace(rule, template);
    });

    // Return Markdown rendered text.
    return markdown.renderInline(text);
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
