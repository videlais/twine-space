// Require jQuery
const $ = require('jquery');

/**
 * A proxy between AFrame (which uses elements and attributes) 
 *  and our macros.
 * 
 * @class AFrameProxy
 */
class AFrameProxy {
    /**
    * Create an a-scene element if one does not exist.
    *
    * @function createScene
    * @static
    */
    static createScene () {
        // As this might be called multiple times,
        //  we need to test to see if the <a-scene>
        //  element already exists before we add
        //  another one to the document.
        if($('a-scene').length === 0) {
            // Create a new a-scene element.
            this.scene = $('<a-scene />');
            // Add the a-scene element to the body.
            $(document.body).append(this.scene);
        }
    }

    /**
    * Adds an a-element child to the current a-scene parent.
    *
    * @function add
    * @static
    */
    static add(entity = 'box', attributes = '') {
        // Create element based on entity name
        const entityElement = $(`<a-${entity} ${attributes} />`);
        $(this.scene).append(entityElement);
    }

    /**
    * Removes the current a-scene element.
    *
    * @function removeScene
    * @static
    */
    static removeScene() {
        // Is there an a-scene element?
        if($('a-scene').length > 0) {
            // Remove the a-scene element.
            $('a-scene').remove();
        }
    }
}

module.exports = AFrameProxy;