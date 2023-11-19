const MarkdownIt = require('markdown-it');
const BabylonProxy = require('./BabylonProxy.js');
const YAML = require('yaml');

/**
 * Methods for un-escaping and parsing author content from passages
 * into visual effects and content for readers.
 * @class Markdown
 */
class Markdown {
  /**
   * parse
   * @function parse
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text.
   * @static
   */
  static parse (text) {
    // Set default result.
    let result = text;

    // Does the passage contain the '---' YAML delimiter?
    // (If so, we need to parse and remove the YAML.)
    if(text.includes('---')) {
      // Split the passage into two parts.
      const yamlToParse = text.split('---')[0];

      // Parse the YAML.
      const jsObject = Markdown.parseYaml(yamlToParse);

      // Check for error.
      
        // Create scene.
        BabylonProxy.createScene();

        // Generate 3D objects.
        BabylonProxy.generateSceneFromObject(jsObject);

        // Parse the links.
        result = text.split('---')[1];
    }

    // Parse the links.
    result = Markdown.parseLinks(result);
    
    // Parse the Markdown.
    result = Markdown.parseMarkdown(result);

    // Return the text.
    return result;
  }

  /**
   * parseLinks
   * @function parseLinks
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text with links.
   * @static
   */
  static parseLinks (text) {
    // Rules for translation.
    const rules = [
      // [[rename|destination]]
      [/\[\[(.*?)\|(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[rename->dest]]
      [/\[\[(.*?)->(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[dest<-rename]]
      [/\[\[(.*?)<-(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$2</tw-link>'],
      // [[destination]]
      [/\[\[(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$1</tw-link>']
    ];

    // For each rule, translate Twine markdown into rules.
    rules.forEach(([rule, template]) => {
      // Replace the rule with the template.
      text = text.replace(rule, template);
    });

    // Return the translated text.
    return text;
  }

  /**
   * parseMarkdown
   * @param {string} text 
   * @returns {string} Parsed text.
   */
  static parseMarkdown (text) {
    // Create MarkdownIt object.
    const markdown = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
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

  /**
   * parseYAML
   * (1) Parse the YAML.
   * (2) Return the parsed YAML or error.
   * @param {string} text.
   * @returns {object} Parsed YAML.
   */
  static parseYaml (text) {
    // Create default object.
    let jsObject = {};
    // Try to parse the YAML.
    try {
      // Parse the YAML.
      jsObject = YAML.parse(text);
      // If the parsing fails, catch the error generated to pass back.
    } catch({ name, message }) {
      // Create error property.
      jsObject = [
        {error: `${name}: ${message}`}
      ];
    } finally {
      // Return the parsed YAML.
      return jsObject;
    }
  }
}

module.exports = Markdown;
