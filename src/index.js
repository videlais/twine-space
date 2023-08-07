// Import story CSS (used by WebPack)
import './story.css';
// Require jQuery
import $ from 'jquery';
// Require Story
import Story from './Story.js';
// Create global jQuery
window.$ = $;
// Create global Story object
window.story = new Story();
// Start the story.
window.story.start();
