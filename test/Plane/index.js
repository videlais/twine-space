import Director from '../../src/Director.js';
import $ from 'jquery';
import Plane from '../../src/Actors/Plane.js';

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add Box to Director.Shapes.
window.Director.Actors = {
  Plane: Plane
};
