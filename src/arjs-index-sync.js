// Synchronous version for testing - loads AR.js directly without dynamic imports
require('../node_modules/ar.js/aframe/build/aframe-ar.js');

// Export a simple function that just resolves immediately since AR.js is already loaded
function loadARJS() {
    return Promise.resolve();
}

if (typeof window !== 'undefined') {
    window.loadARJS = loadARJS;
} else {
    module.exports = { loadARJS };
}
