// Require the 'fs' package
const fs = require('fs');
// Require 'shelljs' package
const shelljs = require('shelljs');
// Require 'colors' package
const colors = require('colors');

/*
 * Part 1:
 *  a) Read the story.json file for story format values
 */

// Read the "story.json" file using 'utf8' encoding
const storyFile = fs.readFileSync("story.json", 'utf8');
// Parse the string into an object
const story = JSON.parse(storyFile);

/*
 * Part 2:
 *  a) Read bundle.js,
 *  b) Replace SCRIPT in index.html with content, and 
 *  c) Save prepared story source
 */

// Read bundle.js (created using "node run build")
const compiledSource = fs.readFileSync("bundle.js", 'utf8');

// Read index.html (contains markers Twine editor will later replace)
let indexSource = fs.readFileSync("src/index.html", 'utf8');

// Replace SCRIPT with compiledSource
indexSource = indexSource.replace('SCRIPT', compiledSource);

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
fs.unlinkSync("bundle.js");
// Move to 'dist' folder
shelljs.cd('./dist');
// Get full path to file
const storyFormatFilePath = `${shelljs.pwd()}/format.js`;
// Show path to user
console.log(`format.js path is: ${colors.blue(storyFormatFilePath)}`);