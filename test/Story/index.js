import Director from '../../src/Director.js';
import $ from 'jquery';
import Story from '../../src/Story.js';

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add the story to the window.
window.story = new Story();
