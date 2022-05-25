// Require jQuery
const $ = require('jquery');

class AFrameProxy {
    static makeScene () {
        // Create a-scene element
        this.scene = $('<a-scene />');
        // Add the scene to the body
        $(document.body).append(this.scene);
    }

    static add(entity = 'box', attributes = '') {
        // Create element based on entity name
        const entityElement = $(`<a-${entity} ${attributes} />`);
        $(this.scene).append(entityElement);
    }
}

module.exports = AFrameProxy;