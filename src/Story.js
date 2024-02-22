import $ from 'jquery';
import { parse as parseScene } from './Parse/Scene/index.js';
import { parse as parseLinks } from './Parse/Links.js';
import { parse as parseMarkdown } from './Parse/Markdown.js';
import Passage from './Passage.js';
import ActorFactory from './ActorFactory.js';

/**
 * An object representing the entire story. After the document has completed
 * loading, an instance of this class will be available at `window.story`.
 * @class Story
 */
export default class Story {
  constructor () {
    /**
     * @property {Element} storyDataElement - Reference to tw-storydata element.
     * @type {Element}
     * @readonly
     */
    this.storyDataElement = null;

    // Test if the tw-storydata element exists.
    if ($('tw-storydata').length === 0) {
      // It does not exist, throw an error.
      console.warn('Warning: tw-storydata element does not exist!');
    } else {
      // It does exist, so set the reference.
      this.storyDataElement = $('tw-storydata');
    }

    /**
     * @property {string} name - The name of the story.
     * @type {string}
     * @readonly
     */
    this.name = null;

    // Check if storyDataElement exists.
    if (this.storyDataElement !== null) {
      // Check if the 'name' attribute exists.
      // (jQuery does not have a hasAttribute method.)
      // (Use the first element in the array and DOM hasAttribute method.)
      if (this.storyDataElement[0].hasAttribute('name')) {
        // If it does, set the name to the value.
        this.name = this.storyDataElement.attr('name');
      }
    }

    /**
     * An array of all passages, indexed by ID.
     * @property {Array} passages - Passages array
     * @type {Array}
     */
    this.passages = [];

    // Check if any tw-passagedata elements exist.
    if ($('tw-passagedata').length >= 1) {
      // For each child element of the tw-storydata element,
      //  create a new Passage object based on its attributes.
      $('tw-passagedata').each((index, element) => {
        // Create a reference to the current element.
        const elementReference = $(element);

        let tags = [];
        let name = '';

        // Check if the 'tags' attribute exists.
        if (elementReference[0].hasAttribute('tags')) {
          // If it does, split the string by space.
          tags = elementReference.attr('tags').split(' ');
        }

        // Check if the 'name' attribute exists.
        if (elementReference[0].hasAttribute('name')) {
          // If it does, set the name to the value.
          name = elementReference.attr('name');
        }

        // Push the new passage.
        this.passages.push(new Passage(
          name,
          tags,
          elementReference.html()
        ));
      });
    } else {
      // It does not exist, throw an error.
      console.warn('Warning: tw-passagedata elements do not exist!');
    }

    /**
     * An array of user-specific scripts to run when the story is begun.
     * @property {Array} userScripts - Array of user-added JavaScript.
     * @type {Array}
     */
    this.userScripts = [];

    // Add the internal (HTML) contents of all SCRIPT tags.
    // Per spec, there will only be one SCRIPT tag with the type "text/twine-javascript".
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

    this.storyElement = null;

    // Check if the tw-story element exists.
    if ($('tw-story').length === 0) {
      // It does not exist, throw an error.
      console.warn('Warning: tw-story element does not exist!');
    } else {
      // It does exist, so set the reference.
      this.storyElement = $('tw-story')[0];
    }

    /**
     * Passage element.
     * @property {Element} passageElement - Passage element.
     * @type {Element}
     */
    this.passageElement = null;

    // Check if the tw-passage element exists.
    if ($('tw-passage').length === 0) {
      // It does not exist, throw an error.
      console.warn('Warning: tw-passage element does not exist!');
    } else {
      // It does exist, so set the reference.
      this.passageElement = $('tw-passage');
    }
  }

  /**
   * Returns the source of a passage by name.
   * @function include
   * @param {string} name Name of the passage.
   * @returns {string} Passage source.
   * @throws {Error} If the passage does not exist.
   */
  include (name) {
    const passage = this.getPassageByName(name);

    if (passage === null) {
      throw new Error('Error: Passage does not exist!');
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

    // For each script, append a new element to the page.
    this.userScripts.forEach((script) => {
      $(document.body).append(`<script>${script}</script>`);
    });

    // Check if the startnode attribute exists.
    if (!this.storyDataElement[0].hasAttribute('startnode')) {
      // It does not exist, throw an error.
      throw new Error('Error: The startnode attribute cannot be found!');
    }

    // Get the startnode attribute.
    const startnode = this.storyDataElement.attr('startnode');

    // Get the startnode value (which is a number).
    const startingPassageID = parseInt(startnode, 10);

    // Try to find the starting passage.
    const startingPassageElement = $(`tw-passagedata[pid="${startingPassageID}"]`);

    // Was it found?
    if (startingPassageElement.length === 0) {
      // Was not found, throw error.
      throw new Error('Error: Starting passage does not exist!');
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
    // Attempt to find passage.
    const passage = this.getPassageByName(name);

    // Does passage exist?
    if (passage === null) {
      // Passage was not found.
      // Throw error.
      throw new Error(`Error: There is no passage with the name "${name}"!`);
    }

    // Overwrite current tags.
    this.passageElement.attr('tags', passage.tags);

    // Detect if a "stage" (---) is present.
    // parseScene() will return an array of objects and 'text' property.
    const content = parseScene(passage.source);

    // Create default, pre-processed text.
    let text = content.text;

    // Check if content contains any actor objects.
    if (content.length > 0) {
      // Go through each object.
      content.forEach((object) => {
        // Create the object.
        ActorFactory.create(object.name, object.options);
      });
    }

    // Parse links.
    text = parseLinks(text);

    // Parse the Markdown.
    text = parseMarkdown(text);

    // Overwrite the parsed with the rendered.
    this.passageElement.html(text);

    /*
    // Update the navigation menu (different per passage!).
    const linkList = $('tw-link');

    // Remove previous menu.
    $('md-menu').remove();

    // Create new navigation menu.
    const navMenu = $('<md-menu positioning="fixed" id="usage-fixed" anchor="usage-fixed-anchor">');

    // Go through each twLink.
    linkList.each((twLink) => {
      // Create menu item.
      const menuItem = $(`<md-menu-item><div slot="headline">${twLink.outerHTML}</div></md-menu-item>`);
      // Append menu-item to navMenu.
      navMenu.append(menuItem);
      // Remove original.
      $(twLink).remove();
    });

    // Append the navMenu back to the body.
    $(document.body).append(navMenu);
    */

    // If there is a click on a tw-link, load the passage!
    $('tw-link[data-passage]').on('click', (e) => {
      // Unload the current meshes.
      window.Director.clearScene();
      // Pull destination passage name from the attribute.
      const passageName = $(e.target).closest('[data-passage]').data('passage');
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
