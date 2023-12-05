const YAML = require('yaml');

/**
   * parseYAML
   * (1) Parse the YAML.
   * (2) Return the parsed YAML or error.
   * @param {string} text.
   * @returns {object} Parsed YAML.
   */
function YAMLParse (text) {
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
