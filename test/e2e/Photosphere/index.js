import Director from '../../../src/Director.js';
import $ from 'jquery';
import { create as Photosphere } from '../../../src/Actors/Photosphere.js';

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add Box to Director.Shapes.
window.Director.Actors = {
  Photosphere
};
