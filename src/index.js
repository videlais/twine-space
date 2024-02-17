// Import story CSS (used by WebPack)
import './story.css';

// Importing Materialize CSS
import '@material/web/dialog/dialog.js';

// Material Text Button
import '@material/web/button/text-button.js';

// Material Filled Button
import '@material/web/button/filled-button.js';

// Material Menu
import '@material/web/menu/menu.js';

// Material Menu Item
import '@material/web/menu/menu-item.js';

// Require jQuery
import $ from 'jquery';

// Require Story
import Story from './Story.js';

// Require Director
import Director from './Director.js';

// Create global jQuery
window.$ = $;

// Create Director
window.Director = Director;

// Create global Story object
window.story = new Story();

// Start the story.
window.story.start();
