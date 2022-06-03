// Require the 'fs' package
const fs = require('fs');
// Require 'chalk' package
const chalk = require('chalk');
// Require ejs
const ejs = require('ejs');

// Read the "story.json" file using 'utf8' encoding
const storyFile = fs.readFileSync("story.json", {'encoding': 'utf8'});
// Parse the string into an object
const story = JSON.parse(storyFile);

// Load template index.html
const srcIndex = fs.readFileSync("src/index.ejs", {'encoding': 'utf8'});

// Load bundled story format
const formatSource = fs.readFileSync("build/core.bundle.js", {'encoding': 'utf8'});
// Load bundled AFrame
const aframeSource = fs.readFileSync("build/aframe.bundle.js", {'encoding': 'utf8'});
// Load CSS
const storyCSS = fs.readFileSync("src/story.css", {'encoding': 'ascii'});

// Replace the story format, bundled AFrame, and CSS code in the template index.html
const indexSource = ejs.render(srcIndex, {format: formatSource, aframe: aframeSource, story_css: storyCSS});

// Write the completed index.html file based on the template replacements (for testing purposes)
fs.writeFileSync("build/index.html", indexSource);

// Set source value of story object
story.source = indexSource;

// Build a "format.js" file contents
// Convert the 'story' back into a string
let format = "window.storyFormat(" + JSON.stringify(story) + ");";
// Write "format.js" file to docs/dist for remote loading
fs.writeFileSync("docs/dist/format.js", format);
