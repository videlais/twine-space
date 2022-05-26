// Require the 'fs' package
const fs = require('fs');
// Require 'shelljs' package
const shelljs = require('shelljs');
// Require 'colors' package
const colors = require('colors');
// Require ejs
const ejs = require('ejs');

// Read the "story.json" file using 'utf8' encoding
const storyFile = fs.readFileSync("story.json", {'encoding': 'utf8'});
// Parse the string into an object
const story = JSON.parse(storyFile);

// Load source index.html
const srcIndex = fs.readFileSync("src/index.ejs", {'encoding': 'utf8'});

const formatSource = fs.readFileSync("build/format.bundle.js", {'encoding': 'utf8'});
const aframeSource = fs.readFileSync("build/arjs.bundle.js", {'encoding': 'utf8'});
const storyCSS = fs.readFileSync("src/story.css", {'encoding': 'ascii'});

const indexSource = ejs.render(srcIndex, {format: formatSource, aframe: aframeSource, story_css: storyCSS});

fs.writeFileSync("build/index.html", indexSource);

// Set source value of story object
story.source = indexSource;

/*
 * Part 3:
 *  a) Write out format.js,
 *  b) Clean up temporary files,
 *  c) Tell user local path to use to load story format file 
 */

// Build a "format.js" file contents
// Convert the 'story' back into a string
let format = "window.storyFormat(" + JSON.stringify(story) + ");";
// Write the "format.js" file using
fs.writeFileSync("dist/format.js", format);
// Delete bundle.js
//fs.unlinkSync("bundle.js");
// Move to 'dist' folder
shelljs.cd('./dist');
// Get full path to file
const storyFormatFilePath = `${shelljs.pwd()}/format.js`;
// Show path to user
console.log(`format.js path is: ${colors.blue(storyFormatFilePath)}`);