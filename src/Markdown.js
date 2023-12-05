const BabylonProxy = require('./BabylonProxy.js');

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
}

module.exports = Markdown;
