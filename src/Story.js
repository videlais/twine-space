/**
 * @external Element
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Element}
 */
import $ from "jquery";
import ejs from 'ejs';
import UnescapeText from './Parsing/UnescapeText.js';
import ParsePassage from './Parsing/ParsePassage.js';
import Passage from './Passage.js';
import BabylonProxy from './BabylonProxy.js';

/**
 * An object representing the entire story. After the document has completed
 * loading, an instance of this class will be available at `window.story`.
 * @class Story
 */
export default class Story {
  constructor () {
    /**
     * @property {Element} storyDataElement - Reference to tw-storydata element
     * @type {Element}
     * @readonly
     */
    this.storyDataElement = $('tw-storydata');

    /**
     * @property {string} name - The name of the story.
     * @type {string}
     * @readonly
     */
    this.name = this.storyDataElement.attr('name');

    /**
     * @property {string} creator - The program that created this story.
     * @type {string}
     * @readonly
     */
    this.creator = this.storyDataElement.attr('creator');

    /**
     * @property {string} creatorVersion - The version of the program used to create this story.
     * @type {string}
     * @readonly
     */
    this.creatorVersion = this.storyDataElement.attr('creator-version');

    /**
     * An array of all passages, indexed by ID.
     * @property {Array} passages - Passages array
     * @type {Array}
     */
    this.passages = [];

    // For each child element of the tw-storydata element,
    //  create a new Passage object based on its attributes.
    this.storyDataElement.children('tw-passagedata').each((index, element) => {
      const elementReference = $(element);
      let tags = elementReference.attr('tags');

      // Does the 'tags' attribute exist?
      if (tags !== '' && tags !== undefined) {
        // Attempt to split by space
        tags = tags.split(' ');
      } else {
        // It did not exist, so we create it as an empty array.
        tags = [];
      }

      // Push the new passage.
      this.passages.push(new Passage(
        elementReference.attr('name'),
        tags,
        UnescapeText(elementReference.html())
      ));
    });

    /**
     * An array of user-specific scripts to run when the story is begun.
     * @property {Array} userScripts - Array of user-added JavaScript.
     * @type {Array}
     */
    this.userScripts = [];

    // Add the internal (HTML) contents of all SCRIPT tags
    $('*[type="text/twine-javascript"]').each((index, value) => {
      this.userScripts.push($(value).html());
    });

    /**
     * An array of user-specific style declarations to add when the story is
     * begun.
     * @property {Array} userStyles - Array of user-added styles.
     * @type {Array}
     */
    this.userStyles = [];

    // Add the internal (HTML) contents of all STYLE tags
    $('*[type="text/twine-css"]').each((index, value) => {
      this.userStyles.push($(value).html());
    });

    /**
     * Story element.
     * @property {Element} storyElement - Story element.
     * @type {Element}
     * @readonly
     */
    this.storyElement = $('tw-story');

    /**
     * Passage element.
     * @property {Element} passageElement - Passage element.
     * @type {Element}
     */
    this.passageElement = $('tw-passage');

    // If there is a click on a tw-link, load the passage!
    $('tw-link[data-passage]').on('click', (e) => {
      // Unload the current meshes.
      BabylonProxy.clearScene();
      // Pull destination passage name from the attribute.
      const passageName = UnescapeText($(e.target).closest('[data-passage]').data('passage'));
      // Show the passage by name.
      this.show(passageName);
    });

    // Hide the canvas to start.
    $('renderCanvas').hide();
  }

  /**
   * Returns the source of a passage by name.
   * @function include
   * @param {string} name Name of the passage.
   * @returns {string} Passage source.
   */
  include (name) {
    const passage = this.getPassageByName(name);

    if (passage === null) {
      throw new Error('Passage does not exist!');
    }

    return passage.source;
  }

  /**
   * Begins playing this story based on data from tw-storydata.
   * @function start
   */
  start () {
    // For each style, add them to the body as extra style elements.
    this.userStyles.forEach((style) => {
      $(document.body).append(`<style>${style}</style>`);
    });

    // For each script, run them.
    this.userScripts.forEach((script) => {
      try {
        ejs.render(`<%${script}%>`, { $ });
      } catch (error) {
        throw new Error(`User script error: ${error}`);
      }
    });

    // Look for passages with 'script' tag.
    const scriptPassages = this.getPassagesByTag('script');

    // For each script, run them.
    scriptPassages.forEach((script) => {
      try {
        ejs.render(`<%${script.source}%>`, { $ });
      } catch (error) {
        throw new Error(`User script error: ${error}`);
      }
    });

    // Get the startnode value (which is a number).
    const startingPassageID = parseInt(this.storyDataElement.attr('startnode'));

    // Try to find the starting passage
    const startingPassageElement = $(`[pid="${startingPassageID}"]`);

    // Was it found?
    if (startingPassageElement.length === 0) {
      // Was not found, throw error.
      throw new Error('Starting passage not found!');
    }

    // If the 'name' attribute does not exist,
    //  show() will be passed undefined
    //  and throw an error.
    this.show(startingPassageElement.attr('name'));
  }

  /**
   * Replaces current passage shown to reader with rendered source of named passage.
   * If the named passage does not exist, an error is thrown.
   * @function show
   * @param {string} name - name of the passage.
   */
  show (name) {
    // Remove previous menu.
    $('md-menu').remove();

    // Attempt to find passage.
    const passage = this.getPassageByName(name);

    // Does passage exist?
    if (passage === null) {
      // Passage was not found.
      // Throw error.
      throw new Error(`There is no passage with the name ${name}`);
    }

    // Overwrite current tags.
    this.passageElement.attr('tags', passage.tags);

    // Use Snowman approach to pre-processing.
    try {
      passage.source = ejs.render(passage.source, { $ }, { outputFunctionName: 'echo' });
    } catch (error) {
      throw new Error(`User script error: ${error}`);
    }

    // Overwrite the parsed with the rendered.
    this.passageElement.html(ParsePassage(passage.source));

    // Update the navigation menu (different per passage!).
    const linkList = document.querySelectorAll('tw-link');

    // Create navigation menu.
    const navMenu = $('<md-menu positioning="fixed" id="usage-fixed" anchor="usage-fixed-anchor">');

    // Go through each twLink.
    linkList.forEach((twLink) => {
      // Create menu item.
      const menuItem = $(`<md-menu-item><div slot="headline">${twLink.outerHTML}</div></md-menu-item>`);
      // Append menu-item to navMenu.
      navMenu.append(menuItem);
      // Remove original.
      $(twLink).remove();
    });

    // Append the navMenu back to the body.
    $(document.body).append(navMenu);

    // If there is a click on a tw-link, load the passage!
    $('tw-link[data-passage]').on('click', (e) => {
      // Unload the current meshes.
      BabylonProxy.clearScene();
      // Pull destination passage name from the attribute.
      const passageName = UnescapeText($(e.target).closest('[data-passage]').data('passage'));
      // Show the passage by name.
      this.show(passageName);
    });
  }

  /**
   * Returns an array of none, one, or many passages matching a specific tag.
   * @function getPassagesByTag
   * @param {string} tag - Tag to search for.
   * @returns {Array} Array containing none, one, or many passage objects.
   */
  getPassagesByTag (tag) {
    // Search internal passages
    return this.passages.filter((p) => {
      return p.tags.includes(tag);
    });
  }

  /**
   * Returns a Passage object by name from internal collection. If none exists, returns null.
   * The Twine editor prevents multiple passages from having the same name, so
   * this always returns the first search result.
   * @function getPassageByName
   * @param {string} name - name of the passage.
   * @returns {Passage|null} Passage object or null.
   */
  getPassageByName (name) {
    // Create default value
    let passage = null;

    // Search for any passages with the name
    const result = this.passages.filter((p) => p.name === name);

    // Were any found?
    if (result.length !== 0) {
      // Grab the first result.
      passage = result[0];
    }

    // Return either null or first result found.
    return passage;
  }
}
