// Import story CSS (used by WebPack)
import '../story.css';
// Require jQuery
const $ = require('jquery');
// Require Story
const Story = require('../Story.js');
// Create global jQuery
window.$ = $;
// Create global Story object
window.story = new Story();
// Start the story.
window.story.start();
