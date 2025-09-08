const fs = require('fs');
const path = require('path');

// Find files with hash-based names
const buildDir = path.join(__dirname, 'build');
const files = fs.readdirSync(buildDir);

const coreJsFile = files.find(file => file.startsWith('core.') && file.endsWith('.bundle.js'));
const coreCssFile = files.find(file => file.startsWith('core.') && file.endsWith('.css'));

if (!coreJsFile || !coreCssFile) {
    console.error('Core bundle files not found. Available files:', files);
    process.exit(1);
}

// Read the core bundles
const coreBundle = fs.readFileSync(path.join(buildDir, coreJsFile), 'utf8');
const coreCss = fs.readFileSync(path.join(buildDir, coreCssFile), 'utf8');

// Simple A-Frame script that loads from CDN to avoid file:// protocol issues
const aframeTestBundle = `
console.log('Loading A-Frame from CDN...');
var script = document.createElement('script');
script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
script.onload = function() {
    console.log('A-Frame loaded from CDN');
    window.loadAFrame = function() { return Promise.resolve(); };
};
script.onerror = function() {
    console.error('Failed to load A-Frame from CDN');
};
document.head.appendChild(script);
`;

const formatJs = `
window.storyFormat({
    "name": "TwineSpace",
    "version": "1.0.0",
    "author": "Dan Cox",
    "description": "A story format for creating 3D and VR stories using A-Frame.",
    "proofing": false,
    "source": "<!DOCTYPE html>\\n<html>\\n    <head>\\n        <meta charset=\\"utf-8\\">\\n        <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">\\n        <meta http-equiv=\\"X-UA-Compatible\\" content=\\"ie=edge\\">\\n        <title>{{STORY_NAME}}</title>\\n        <style>${coreCss.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</style>\\n        <script>${aframeTestBundle.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</script>\\n    </head>\\n    <body>\\n        {{STORY_DATA}}\\n        <script>${coreBundle.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</script>\\n    </body>\\n</html>"
});
`;

// Ensure the docs/dist directory exists
const docsDistDir = path.join(__dirname, 'docs', 'dist');
if (!fs.existsSync(docsDistDir)) {
    fs.mkdirSync(docsDistDir, { recursive: true });
}

// Write the test format
fs.writeFileSync(path.join(docsDistDir, 'aframe-format-test.js'), formatJs);
console.log('Test format built successfully');
console.log('File size:', fs.statSync(path.join(docsDistDir, 'aframe-format-test.js')).size, 'bytes');
