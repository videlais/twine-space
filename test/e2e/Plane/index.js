import Director from '../../../src/Director.js';
import { create as Plane } from '../../../src/Actors/Plane.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Add Plane to Director.Actors.
window.Director.Actors = {
  Plane
};

// Mark as ready
window.jQueryReady = Promise.resolve(true);
