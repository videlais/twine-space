import Director from '../../../src/Director.js';
import $ from 'jquery';
import Sphere from '../../../src/Actors/Sphere.js';

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add Box to Director.Actors.
window.Director.Actors = {
  Sphere: Sphere
};
