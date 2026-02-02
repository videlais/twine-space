import Director from '../../../src/Director.js';
import { create as Annotation } from '../../../src/Actors/Annotation.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Add Annotation to Director.Actors.
window.Director.Actors = {
  Annotation
};

// Mark as ready
window.jQueryReady = Promise.resolve(true);
