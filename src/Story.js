const $ = require('jquery');
const Passage = require('./Passage.js');
const Markdown = require('./Markdown.js');

// Require AFrameProxy
const AFrameProxy = require('./AFrameProxy.js');

class Story {
    constructor() {
        
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
         * @property {number} startPassage - The ID of the first passage to be displayed.
         * @type {number}
         * @readonly
         */
        this.startPassage = parseInt(this.storyDataElement.attr('startnode'));

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
        * @property {string} ifid - Internal IFID
        * @type {string}
        */
        this.ifid = this.storyDataElement.attr('ifid');

        /**
        * @property {array} passages - Internal array of passages
        * @type {array}
        */
        this.passages = [];

        // For each child element of the tw-storydata element,
        //  create a new Passage object based on its attributes.
        this.storyDataElement.children('tw-passagedata').each((index, element) => {
            const elementReference = $(element);
            const id = parseInt(elementReference.attr('pid'));
            let tags = elementReference.attr('tags');
      
            // Does the 'tags' attribute exist?
            if(tags !== '' && tags !== undefined) {
              // Attempt to split by space
              tags = tags.split(' ');
            } else {
              // It did not exist, so we create it as an empty array.
              tags = [];
            }
      
            this.passages.push(new Passage(
              id,
              elementReference.attr('name'),
              tags,
              elementReference.html()
            ));
        });

       /**
        * @property {Element} storyElement - Reference to tw-story element
        * @type {Element}
        */
        this.storyElement = $('tw-story');

        // Catch all navigation events
        this.storyElement.on('click', 'a[data-passage]', (e) => {
            // Retrieve the name of the passage from the attribute of the element
            this.show(Markdown.unescape(
                $(e.target).closest('[data-passage]').data('passage')
            ));
        });

       /**
        * @property {Element} passageElement - Element containing currently displayed passage
        * @type {Element}
        */
        this.passageElement = $('<tw-passage class="passage" aria-live="polite"></tw-passage>');

        // Append the passage element to the tw-story
        this.storyElement.append(this.passageElement);

        // Make a scene
        AFrameProxy.makeScene();
    }

   /**
    * Returns a Passage object by name.
    * If none exists, returns null.
    *
    * @function getPassageByName
    * @param {string} name - name of the passage
    * @returns {Passage|null} - Passage object or null
    */
    getPassageByName (name) {
        // Set a default value
        let passage = null;

        // Look through (filter) the array of passages by name
        const result = this.passages.filter((p) => p.name === name);

        // Did we find one?
        // If so, the array length will not be 0.
        if (result.length !== 0) {
            // Grab the first entry of the array.
            passage = result[0];
        }

        // Return either the default (null) or found passage.
        return passage;
    }

    /**
    * Returns the Passage object corresponding to id.
    * If none exists, returns null.
    *
    * @function getPassageById
    * @param {number} id - name of the passage
    * @returns {Passage|null} - Passage object or null
    */
     getPassageById (id) {
        // Set a default value
        let passage = null;

        // Look through (filter) the array of passages by name
        const result = this.passages.filter((p) => p.id === id);

        // Did we find one?
        // If so, the array length will not be 0.
        if (result.length !== 0) {
            // Grab the first entry of the array.
            passage = result[0];
        }

        // Return either the default (null) or found passage.
        return passage;
    }

   /**
    * Render named passage object into passage element
    *
    * @function show
    * @param {string} name - name of the passage
    */
    show(name) {
        // Does this passage exist?
        const passage = this.getPassageByName(name);

        // The passage does not exist.
        if (passage === null) {
            // Throw an error
            throw new Error(
                'There is no passage with the name "' + name + '"'
            );
        }

        // The passage exists.
        this.passageElement.html( passage.render() );
    }

    /**
    * Start the story. (Render the starting passage.)
    *
    * @function start
    */
    start() {
        // Retrieve Passage object matching starting passage.
        const passage = this.getPassageById(this.startPassage);

        // Does the passage exist?
        if(passage !== null) {
            // Replace passageElement content with passage.render()
            this.passageElement.html( passage.render() );
        }
   }
}

module.exports = Story;