import Director from '../../../src/Director.js';
import { create as Photosphere } from '../../../src/Actors/Photosphere.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Add Photosphere to Director.Actors.
window.Director.Actors = {
  Photosphere
};

// Mark as ready
window.jQueryReady = Promise.resolve(true);
