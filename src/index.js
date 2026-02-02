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

// Dynamically import jQuery to ensure window is available (jQuery 4.0+ compatibility)
import('jquery').then(module => {
  // Create global jQuery
  window.$ = module.default;

  // Now import and initialize components that depend on jQuery
  Promise.all([
    import('./Story.js'),
    import('./Director.js'),
    import('./ActorFactory.js')
  ]).then(([StoryModule, DirectorModule, ActorFactoryModule]) => {
    const Story = StoryModule.default;
    const Director = DirectorModule.default;
    const ActorFactory = ActorFactoryModule.default;

    // Create Director
    window.Director = Director;

    // Create scene.
    window.Director.createScene();

    // Setup ActorFactory.
    window.ActorFactory = ActorFactory;

    // Create global Story object
    window.story = new Story();

    // Start the story.
    window.story.start();
  });
});
