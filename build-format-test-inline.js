const fs = require('fs');
const path = require('path');

// Read the current webpack bundles
const buildDir = path.join(__dirname, 'build');
const files = fs.readdirSync(buildDir);

const coreJsFile = files.find(file => file.startsWith('core.') && file.endsWith('.bundle.js'));
const coreCssFile = files.find(file => file.startsWith('core.') && file.endsWith('.css'));
const aframeJsFile = files.find(file => file.startsWith('aframe.') && file.endsWith('.bundle.js'));

if (!coreJsFile || !coreCssFile || !aframeJsFile) {
    console.error('Required bundle files not found. Available files:', files);
    process.exit(1);
}

// Read the bundles
const coreBundle = fs.readFileSync(path.join(buildDir, coreJsFile), 'utf8');
const coreCss = fs.readFileSync(path.join(buildDir, coreCssFile), 'utf8');
const aframeBundle = fs.readFileSync(path.join(buildDir, aframeJsFile), 'utf8');

// Create a test-specific format that includes everything inline (no dynamic imports)
const testFormatJs = `
window.storyFormat({
    "name": "TwineSpace",
    "version": "1.0.0-test",
    "author": "Dan Cox",
    "description": "Test story format with inline bundles",
    "proofing": false,
    "source": "<!DOCTYPE html>\\n<html>\\n<head>\\n<meta charset=\\"utf-8\\">\\n<title>{{STORY_NAME}}</title>\\n<style>${coreCss.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</style>\\n</head>\\n<body>\\n<tw-story class=\\"centered\\"><tw-passage class=\\"passage\\"></tw-passage></tw-story>\\n{{STORY_DATA}}\\n<script>${aframeBundle.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</script>\\n<script>${coreBundle.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}</script>\\n</body>\\n</html>"
});
`;

// Ensure the docs/dist directory exists
const docsDistDir = path.join(__dirname, 'docs', 'dist');
if (!fs.existsSync(docsDistDir)) {
    fs.mkdirSync(docsDistDir, { recursive: true });
}

// Write the test format
fs.writeFileSync(path.join(docsDistDir, 'aframe-format-test-inline.js'), testFormatJs);
console.log('Test format with inline bundles created successfully');
console.log('File size:', fs.statSync(path.join(docsDistDir, 'aframe-format-test-inline.js')).size, 'bytes');
