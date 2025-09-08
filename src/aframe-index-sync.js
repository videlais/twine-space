// Synchronous version for testing - loads A-Frame directly without dynamic imports
require('../node_modules/aframe/dist/aframe-master.js');

// Export a simple function that just resolves immediately since A-Frame is already loaded
function loadAFrame() {
    return Promise.resolve();
}

if (typeof window !== 'undefined') {
    window.loadAFrame = loadAFrame;
} else {
    module.exports = { loadAFrame };
}
