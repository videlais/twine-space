// Require the 'fs' package
const fs = require('fs');
const path = require('path');
// Require ejs
const ejs = require('ejs');

// Function to find files by pattern in build directory
function findFile(pattern) {
  const files = fs.readdirSync('build');
  const matchingFile = files.find(file => file.match(pattern));
  if (!matchingFile) {
    throw new Error(`Could not find file matching pattern: ${pattern}`);
  }
  return path.join('build', matchingFile);
}

// Read the "story.json" file using 'utf8' encoding.
const storyFile = fs.readFileSync("story.json", {'encoding': 'utf8'});
// Parse the string into an object.
const story = JSON.parse(storyFile);

// Load template index.html.
const srcIndex = fs.readFileSync("src/index.ejs", {'encoding': 'utf8'});

// Load bundled story format (find core bundle).
const coreFile = findFile(/^core\..+\.bundle\.js$/);
const formatSource = fs.readFileSync(coreFile, {'encoding': 'utf8'});

// Load bundled AR.js (find arjs bundle).
const arjsFile = findFile(/^arjs\..+\.bundle\.js$/);
const arjsSource = fs.readFileSync(arjsFile, {'encoding': 'utf8'});

// Load bundled AFrame (find aframe bundle).
const aframeFile = findFile(/^aframe\..+\.bundle\.js$/);
const aframeSource = fs.readFileSync(aframeFile, {'encoding': 'utf8'});

// Load CSS (find core CSS).
const cssFile = findFile(/^core\..+\.css$/);
const storyCSS = fs.readFileSync(cssFile, {'encoding': 'utf8'});

// Replace the story format, bundled AFrame, and CSS code in the template index.html.
const indexAFrameSource = ejs.render(srcIndex, {
    format: `<script>${formatSource}</script>`,
    arjs: `<script>${aframeSource}</script>`,
    story_css: `<style>${storyCSS}</style>`
});

// Replace the story format, bundled AR.js (which includes AFrame), and CSS code in the template index.html.
const indexARJSSource = ejs.render(srcIndex, {
    format: `<script>${formatSource}</script>`,
    arjs: `<script>${arjsSource}</script>`,
    story_css: `<style>${storyCSS}</style>`
});

// Set source value of story object.
story.source = indexAFrameSource;

// Build a "aframe-format.js" file contents
// Convert the 'story' back into a string
let storyformat = "window.storyFormat(" + JSON.stringify(story) + ");";

// Ensure docs/dist directory exists
if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs');
}
if (!fs.existsSync('docs/dist')) {
  fs.mkdirSync('docs/dist');
}

// Write "aframe-format.js" file to docs/dist for remote loading.
fs.writeFileSync("docs/dist/aframe-format.js", storyformat);

// Set source value of story object.
story.source = indexARJSSource;

// Build a "arjs-format.js" file contents
// Convert the 'story' back into a string
storyformat = "window.storyFormat(" + JSON.stringify(story) + ");";
// Write "format.js" file to docs/dist for remote loading.
fs.writeFileSync("docs/dist/arjs-format.js", storyformat);
