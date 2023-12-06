import BabylonProxy from '../BabylonProxy.js';
import ParseYAML from './ParseYAML.js'
import ParseLinks from './ParseLinks.js';
import ParseMarkdown from './ParseMarkdown.js';

/**
   * ParsePassage
   * @function ParsePassage
   * @param {string} text - Content of a passage.
   * @returns {string} HTML content.
   */
export default function ParsePassage(text) {
    // Set default result.
    let result = text;

    // Does the passage contain the '---' YAML delimiter?
    // (If so, we need to parse and remove the YAML.)
    if(text.includes('---')) {
      // Split the passage into two parts.
      const yamlToParse = text.split('---')[0];

      // Parse the YAML.
      const jsObject = ParseYAML(yamlToParse);
      
      // Create scene.
      BabylonProxy.createScene();

      // Generate 3D objects.
      BabylonProxy.generateScene(jsObject);

      // Parse the links.
      result = text.split('---')[1];
    }

    // Parse the links.
    result = ParseLinks(result);
    
    // Parse the Markdown.
    result = ParseMarkdown(result);

    // Return the text.
    return result;
}
