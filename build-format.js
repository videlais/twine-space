// Require the 'fs' package
const fs = require('fs');
// Require ejs
const ejs = require('ejs');

// Read the "story.json" file using 'utf8' encoding.
const storyFile = fs.readFileSync("story.json", {'encoding': 'utf8'});
// Parse the string into an object.
const story = JSON.parse(storyFile);

// Load template index.html.
const srcIndex = fs.readFileSync("src/index.ejs", {'encoding': 'utf8'});

// Load bundled story format.
const formatSource = fs.readFileSync("build/core.bundle.js", {'encoding': 'utf8'});

// Load bundled AR.js.
const arjsSource = fs.readFileSync("build/arjs.bundle.js", {'encoding': 'utf8'});
// Load CSS.
const storyCSS = fs.readFileSync("build/core.css", {'encoding': 'utf8'});

// Replace the story format, bundled AFrame + ARJS, and CSS code in the template index.html.
const indexSource = ejs.render(srcIndex, {
    format: `<script>${formatSource}</script>`,
    arjs: `<script>${arjsSource}</script>`,
    story_css: `<style>${storyCSS}</style>`
});

// Write the completed index.html file based on the template replacements (for testing purposes).
fs.writeFileSync("build/index.html", indexSource);

// Set source value of story object.
story.source = indexSource;

story.name += ` - Build ${new Date()}`;

// Build a "format.js" file contents
// Convert the 'story' back into a string
let storyformat = "window.storyFormat(" + JSON.stringify(story) + ");";
// Write "format.js" file to docs/dist for remote loading.
fs.writeFileSync("docs/dist/format.js", storyformat);
