import Director from '../../../src/Director.js';
import { create as Sphere } from '../../../src/Actors/Sphere.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Add Sphere to Director.Actors.
window.Director.Actors = {
  Sphere
};

// Mark as ready
window.jQueryReady = Promise.resolve(true);
