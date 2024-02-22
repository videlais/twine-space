import Director from '../../../src/Director.js';
import ActorFactory from '../../../src/ActorFactory.js';
import Story from '../../../src/Story.js';
import $ from 'jquery';

// Setup jQuery.
window.$ = $;

// Setup Story.
window.story = new Story();

// Setup Director.
window.Director = Director;

// Setup ActorFactory.
window.ActorFactory = ActorFactory;
