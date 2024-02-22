import Director from '../../../src/Director.js';
import ActorFactory from '../../../src/ActorFactory.js';
import Story from '../../../src/Story.js';
import $ from 'jquery';

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

// Import story.css from src
import '../../../src/story.css';

// Setup jQuery.
window.$ = $;

// Setup Story.
window.story = new Story();

// Setup Director.
window.Director = Director;

// Setup ActorFactory.
window.ActorFactory = ActorFactory;
