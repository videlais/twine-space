import Director from '../../../src/Director.js';
import $ from 'jquery';
import Annotation from '../../../src/Actors/Annotation.js';

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add Annotation to Director.Shapes.
window.Director.Actors = {
  Annotation
};
