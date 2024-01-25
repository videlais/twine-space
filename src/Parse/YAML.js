import { parse as parseYAML } from 'yaml';

/**
   * parse - Parses text into an array of YAML objects.
   * 
   * If the array is empty, no YAML was detected.
   * 
   * If the array has one or more objects, YAML was detected and correctly parsed.
   * 
   * If parsing failed, the array will contain a single entry object with an error property.
   * 
   * @example
   * `- foo:
   *  bar`
   * // Returns [{ foo: 'bar' }]
   * 
   * `- foo:
   *  bar
   * - baz:
   *  qux`
   * // Returns [{ foo: 'bar', baz: 'qux' }]
   * 
   * @param {string} text - The text to parse, which may or may not contain YAML.
   * @returns {array} An array of parsed YAML objects, empty array if no YAML detected, or an array with an error property if parsing failed.
   */
function parse (text) {
    // Create default object.
    let objects = [];
    
    // Try to parse the YAML.
    try {

      // Parse the YAML.
      objects = parseYAML(text);
      
    } catch({ name, message }) {
      
      // If the parsing fails, catch the error generated to pass back.
      // Create error property.
      objects = [
        { error: `${name}: ${message}` }
      ];
    } finally {

      // Verify if an array was created.
      if(!Array.isArray(objects)) {
        // If not, reset the array.
        objects = [];
      }
      
      // Return the parsed YAML.
      return objects;
    }
}

export { parse };
