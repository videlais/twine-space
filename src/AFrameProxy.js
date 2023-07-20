// Require jQuery
const $ = require('jquery');

/**
 * A proxy between AFrame (which uses elements and attributes)
 * and our macros.
 * @class AFrameProxy
 */
class AFrameProxy {
  /**
   * Create an a-scene element if one does not exist.
   * @function createScene
   * @returns {Element} Current `<a-scene>` element
   * @static
   */
  static createScene () {
    // As this might be called multiple times,
    //  we need to test to see if the <a-scene>
    //  element already exists before we add
    //  another one to the document.
    if ($('a-scene').length === 0) {
      // Add the a-scene element to the body.
      $(document.body).append($('<a-scene vr-mode-ui="enabled: false" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;" />'));
    }

    // Return either current `<a-scene>` or
    //  one just created.
    return $('a-scene');
  }

  /**
   * Adds an a-element child to an element.
   * @function add
   * @param {Element} parent Where child should be appended.
   * @param {string} entity AFrame element to append.
   * @param {string} attributes Element attributes.
   * @returns {Element} Created element.
   * @static
   */
  static add (parent, entity, attributes) {
    // Look for parent element.
    const parentElement = $(parent);

    // Does it exist?
    if (parentElement.length === 0) {
      // Passage does not exist.
      // Throw error.
      throw new Error('Parent element does not exist!');
    }

    // Create element based on entity name.
    const entityElement = $(`<a-${entity} ${attributes} />`);
    parent.append(entityElement);
    return entityElement;
  }

  /**
   * Removes the current a-scene element.
   * @function removeScene
   * @static
   */
  static removeScene () {
    $('a-scene').remove();
  }
}

module.exports = AFrameProxy;
