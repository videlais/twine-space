// Require jQuery
const $ = require('jquery');
// Require AFrame
require('aframe');

class AFrameProxy {
    constructor() {
        // Create a-scene element
        this.scene = $('<a-scene />');
        // Add the scene to the body
        $(document.body).append(this.scene);
    }

    add(entity = 'box', attributes = '') {
        // Create element based on entity name
        const entityElement = $(`<a-${entity} ${attributes} />`);
        $(this.scene).append(entityElement);
    }
}

modules.exports = AFrameProxy;