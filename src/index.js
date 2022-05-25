// Require jQuery
const $ = require('jquery');
// Require Story
const Story = require('./Story');
// Create global jQuery
window.$ = $;
// Create global Story object
window.story = new Story();
// Start the story.
window.story.start();