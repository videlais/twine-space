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

    // Does the passage contain the '---' YAML delimiter?
    // (If so, we need to parse and remove the YAML, if any.)
    if(text.includes('---')) {
      // Split the passage into two parts.
      const yamlToParse = text.split('---')[0];

      // Parse the YAML into possible objects.
      // This will be an array of objects.
      result.objects = parseYAML(yamlToParse);

      // Parse the links.
      result.text = text.split('---')[1];
    }

    // Parse the links.
    result.text = parseLinks(result.text);
    
    // Parse the Markdown.
    result.text = parseMarkdown(result.text);

    // Return the result object.
    return result;
}

export { parse };
