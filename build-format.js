// Require the 'fs' package.
import { readFileSync, writeFileSync } from 'node:fs';

// Require ejs.
import ejs from 'ejs';

// Read the "story.json" file using 'utf8' encoding.
const storyFile = readFileSync("story.json", {'encoding': 'utf8'});

// Parse the string into an object.
const story = JSON.parse(storyFile);

// Load template index.html.
const srcIndex = readFileSync("src/index.ejs", {'encoding': 'utf8'});

// Load bundled story format.
const formatSource = readFileSync("build/core.bundle.js", {'encoding': 'utf8'});

// Load CSS.
const storyCSS = readFileSync("build/core.css", {'encoding': 'utf8'});

// Replace the story format and CSS in the template index.html.
const source = ejs.render(srcIndex, {
    format: `<script>${formatSource}</script>`,
    story_css: `<style>${storyCSS}</style>`
});

// Set source value of story object.
story.source = source;

// Convert the 'story' back into a string.
let storyFormat = "window.storyFormat(" + JSON.stringify(story) + ");";
// Write "format.js" file to docs/dist for remote loading.
writeFileSync("docs/dist/format.js", storyFormat);
