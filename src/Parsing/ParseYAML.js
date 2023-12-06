import { parse } from 'yaml';

/**
   * ParseYAML
   * (1) Parse the YAML.
   * (2) Return the parsed YAML as object or error.
   * @param {string} text.
   * @returns {object} Parsed YAML.
   */
export default function ParseYAML (text) {
    // Create default object.
    let jsObject = {};
    
    // Try to parse the YAML.
    try {

      // Parse the YAML.
      jsObject = parse(text);
      
    } catch({ name, message }) {
      
      // If the parsing fails, catch the error generated to pass back.
      // Create error property.
      jsObject = [
        {error: `${name}: ${message}`}
      ];
    } finally {
      
      // Return the parsed YAML.
      return jsObject;
    }
}
