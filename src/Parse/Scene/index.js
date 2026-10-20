import { parse as parseYAML } from '../YAML.js'
import { parse as parseLinks } from '../Links.js';
import { parse as parseMarkdown } from '../Markdown.js';

/**
   * parse - Parses a scene into shape objects and passage content.
   * 
   * A scene is defined by a stage, which is a line with three dashes (`---`).
   * 
   * (To avoid type errors, the function will force type coercion.)
   * 
   * @example
   * `- foo:
   *      bar
   * ---
   * Hello, world!`
   * // Returns { objects: [], text: 'Hello, world!' }
   * 
   * @function parse
   * @param {string} text - Content of a passage.
   * @returns {object} Object containing parsed YAML (`objects`) and passage content (`text`).
   */
function parse(text = '') {

  // Test if text is a string.
  if(typeof text !== 'string') {
    // Force conversion to string.
    text = String(text);
  }

    // Set default result.
    const result = {
      objects: [],
      text: text
    };

    // Does the passage contain a standalone scene delimiter?
    const separator = /(?:^|\r?\n)[ \t]*---(?=[ \t]*(?:\r?\n|$))/m.exec(text);
    if(separator !== null) {
      const yamlToParse = text.slice(0, separator.index);

      // Parse the YAML into possible objects.
      // This will be an array of objects.
      result.objects = parseYAML(yamlToParse);

      result.text = text.slice(separator.index + separator[0].length);
    }

    // Parse the links.
    result.text = parseLinks(result.text);
    
    // Parse the Markdown.
    result.text = parseMarkdown(result.text);

    // Return the result object.
    return result;
}

export { parse };
