import Director from '../../../src/Director.js';
import ActorFactory from '../../../src/ActorFactory.js';

// Use top-level await to load jQuery before anything else
const jQueryModule = await import('jquery');
window.$ = jQueryModule.default;

// Setup Director after jQuery is loaded.
window.Director = Director;

// Setup ActorFactory.
window.ActorFactory = ActorFactory;

// Mark as ready
window.jQueryReady = Promise.resolve(true);
