import Director from '../../../src/Director.js';
import { create as Box } from '../../../src/Actors/Box.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Add Box to Director.Actors.
window.Director.Actors = {
  Box
};

// Mark as ready
window.jQueryReady = Promise.resolve(true);
