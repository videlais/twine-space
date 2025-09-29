// Build format for testing with CDN dependencies
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Read the "story.json" file using 'utf8' encoding.
const storyFile = fs.readFileSync("story.json", {'encoding': 'utf8'});
// Parse the string into an object.
const story = JSON.parse(storyFile);

// Load template index.html.
const srcIndex = fs.readFileSync("src/index.ejs", {'encoding': 'utf8'});

// Read the source files
const aframeProxySource = fs.readFileSync("src/AFrameProxy.js", {'encoding': 'utf8'});
const passageSource = fs.readFileSync("src/Passage.js", {'encoding': 'utf8'});
const markdownSource = fs.readFileSync("src/Markdown.js", {'encoding': 'utf8'});
const storyJSSource = fs.readFileSync("src/Story.js", {'encoding': 'utf8'});
const storyCSS = fs.readFileSync("src/story.css", {'encoding': 'utf8'});

// For test CDN version, use vendor files instead of bundled files
const indexTestSource = ejs.render(srcIndex, {
    format: `<script src="/vendor/jquery.min.js"></script>
<script src="/vendor/aframe.min.js"></script>
<script src="/vendor/markdown-it.min.js"></script>
<script src="/vendor/lodash.min.js"></script>
<script>

${aframeProxySource}

${passageSource}

${markdownSource}

${storyJSSource}

// Initialize
window.$ = $;
console.log('Initializing complete story system...');
window.story = new Story();
console.log('Story object created, starting story...');
window.story.start();
console.log('Story started successfully');

</script>`,
    arjs: '',
    story_css: `<style>${storyCSS}</style>`
});

// Set source value of story object for test CDN version.
story.source = indexTestSource;

// Convert the 'story' back into a string for test format
let storyformat = "window.storyFormat(" + JSON.stringify(story) + ");";

// Ensure build directory exists
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// Write test format file
fs.writeFileSync("build/test-cdn-format.js", storyformat);

console.log('Test CDN format built successfully');