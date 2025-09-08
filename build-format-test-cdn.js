const fs = require('fs');
const path = require('path');

// Simple approach - build directly from source without webpack optimization
const buildDir = path.join(__dirname, 'build');
const files = fs.readdirSync(buildDir);

const coreCssFile = files.find(file => file.startsWith('core.') && file.endsWith('.css'));

if (!coreCssFile) {
    console.error('Core CSS file not found. Available files:', files);
    process.exit(1);
}

const coreCss = fs.readFileSync(path.join(buildDir, coreCssFile), 'utf8');

// Function to generate complete story code
function getCompleteStoryCode() {
    return `
// AFrame Proxy
class AFrameProxy {
    static createScene() {
        if ($('a-scene').length === 0) {
            $('body').append('<a-scene vr-mode-ui="enabled: false" arjs="debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;" />');
        }
        return $('a-scene');
    }

    static add(parent, type, attributes) {
        if ($(parent).length === 0) {
            throw new Error('Parent element does not exist!');
        }
        const element = $('<a-' + type + ' ' + attributes + ' />');
        parent.append(element);
        return element;
    }

    static removeScene() {
        $('a-scene').remove();
    }
}

// Passage
class Passage {
    constructor(name = 'Default', tags = [], source = '') {
        this.name = name;
        this.tags = tags;
        this.source = source;
    }
}

// Markdown Parser
class Markdown {
    static parse(text) {
        AFrameProxy.removeScene();
        
        // Process Twine links and A-Frame syntax
        const rules = [
            [new RegExp('\\\\[\\\\[(.*?)\\\\|(.*?)\\\\]\\\\]', 'g'), '<tw-link role="link" data-passage="$2">$1</tw-link>'],
            [new RegExp('\\\\[\\\\[(.*?)->(.*?)\\\\]\\\\]', 'g'), '<tw-link role="link" data-passage="$2">$1</tw-link>'],
            [new RegExp('\\\\[\\\\[(.*?)<-(.*?)\\\\]\\\\]', 'g'), '<tw-link role="link" data-passage="$1">$2</tw-link>'],
            [new RegExp('\\\\[\\\\[(.*?)\\\\]\\\\]', 'g'), '<tw-link role="link" data-passage="$1">$1</tw-link>'],
            [new RegExp('\\\\((.*?):([^>]*?)\\\\)\\\\[([^>]*?)\\\\]', 'gim'), (match, type, attributes, children) => {
                const scene = AFrameProxy.createScene();
                const element = AFrameProxy.add(scene, type, attributes);
                children.replace(new RegExp('\\\\((.*?):([^>]*?)\\\\)', 'gim'), (childMatch, childType, childAttributes) => {
                    AFrameProxy.add(element, childType, childAttributes);
                    return '';
                });
                return '';
            }],
            [new RegExp('\\\\((.*?):([^>]*?)\\\\)', 'gim'), (match, type, attributes) => {
                if (type.toLowerCase() === 'embed-scene') {
                    const passageName = attributes.trim().slice(1, -1);
                    const passage = window.story.include(passageName);
                    $('body').append(passage);
                    return '';
                }
                const scene = AFrameProxy.createScene();
                AFrameProxy.add(scene, type, attributes);
                return '';
            }],
            [new RegExp('[\\r\\n]', 'g'), '<br>']
        ];
        
        rules.forEach(([pattern, replacement]) => {
            text = text.replace(pattern, replacement);
        });
        
        if ($('a-marker').length > 0) {
            $('a-scene').append('<a-entity camera>');
        }
        
        return markdownit().renderInline(text);
    }

    static unescape(text) {
        const rules = [
            ['&amp;', '&'],
            ['&lt;', '<'],
            ['&gt;', '>'],
            ['&quot;', '"'],
            ["&#x27;", "'"]
        ];
        
        rules.forEach(([encoded, decoded]) => {
            text = text.replaceAll(encoded, decoded);
        });
        
        return text;
    }
}

// Story
class Story {
    constructor() {
        this.storyDataElement = $('tw-storydata');
        this.name = this.storyDataElement.attr('name');
        this.creator = this.storyDataElement.attr('creator');
        this.creatorVersion = this.storyDataElement.attr('creator-version');
        this.passages = [];
        
        this.storyDataElement.children('tw-passagedata').each((index, element) => {
            const $element = $(element);
            const tags = $element.attr('tags');
            const tagArray = tags !== '' && tags !== undefined ? tags.split(' ') : [];
            this.passages.push(new Passage(
                $element.attr('name'),
                tagArray,
                Markdown.unescape($element.html())
            ));
        });
        
        this.userScripts = [];
        $('*[type="text/twine-javascript"]').each((index, element) => {
            this.userScripts.push($(element).html());
        });
        
        this.userStyles = [];
        $('*[type="text/twine-css"]').each((index, element) => {
            this.userStyles.push($(element).html());
        });
        
        this.storyElement = $('tw-story');
        this.storyElement.on('click', 'tw-link[data-passage]', (event) => {
            const passageName = Markdown.unescape($(event.target).closest('[data-passage]').data('passage'));
            this.show(passageName);
        });
        
        this.passageElement = $('tw-passage');
    }
    
    include(passageName) {
        const passage = this.getPassageByName(passageName);
        if (passage === null) {
            throw new Error('Passage does not exist!');
        }
        return passage.source;
    }
    
    start() {
        this.userStyles.forEach(style => {
            $('body').append('<style>' + style + '</style>');
        });
        
        this.userScripts.forEach(script => {
            try {
                _.template('<% ' + script + ' %>')({ $: $ });
            } catch (error) {
                throw new Error('User script error: ' + error);
            }
        });
        
        this.getPassagesByTag('script').forEach(passage => {
            try {
                _.template('<% ' + passage.source + ' %>')({ $: $ });
            } catch (error) {
                throw new Error('User script error: ' + error);
            }
        });
        
        const startNode = parseInt(this.storyDataElement.attr('startnode'));
        const startPassage = $('[pid="' + startNode + '"]');
        if (startPassage.length === 0) {
            throw new Error('Starting passage not found!');
        }
        this.show(startPassage.attr('name'));
    }
    
    show(passageName) {
        const passage = this.getPassageByName(passageName);
        if (passage === null) {
            throw new Error('There is no passage with the name ' + passageName);
        }
        this.passageElement.attr('tags', passage.tags);
        
        try {
            passage.source = _.template(passage.source, { variable: '$' })({ $: $ });
        } catch (error) {
            console.log('Template error (non-fatal):', error);
            // Continue without templating if there's an error
        }
        
        this.passageElement.html(Markdown.parse(passage.source));
    }
    
    getPassagesByTag(tag) {
        return this.passages.filter(passage => passage.tags.includes(tag));
    }
    
    getPassageByName(passageName) {
        const matchingPassages = this.passages.filter(passage => passage.name === passageName);
        return matchingPassages.length !== 0 ? matchingPassages[0] : null;
    }
}

// Initialize
window.$ = $;
console.log('Initializing complete story system...');
window.story = new Story();
console.log('Story object created, starting story...');
window.story.start();
console.log('Story started successfully');
`;
}

// Create a test format with complete story processing functionality
const testFormatJs = `
window.storyFormat({
    "name": "TwineSpace",
    "version": "1.0.0-test",
    "author": "Dan Cox", 
    "description": "Test story format with local vendor dependencies",
    "proofing": false,
    "source": ${JSON.stringify(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{{STORY_NAME}}</title>
<style>${coreCss}</style>
</head>
<body>
<tw-story class="centered"><tw-passage class="passage"></tw-passage></tw-story>
{{STORY_DATA}}
<script src="/vendor/jquery.min.js"></script>
<script src="/vendor/aframe.min.js"></script>
<script src="/vendor/markdown-it.min.js"></script>
<script src="/vendor/lodash.min.js"></script>
<script>
${getCompleteStoryCode()}
</script>
</body>
</html>`)}
});
`;

// Ensure the docs/dist directory exists
const docsDistDir = path.join(__dirname, 'docs', 'dist');
if (!fs.existsSync(docsDistDir)) {
    fs.mkdirSync(docsDistDir, { recursive: true });
}

// Write the test format
fs.writeFileSync(path.join(docsDistDir, 'aframe-format-test-cdn.js'), testFormatJs);
console.log('Local vendor-based test format created successfully');
console.log('File size:', fs.statSync(path.join(docsDistDir, 'aframe-format-test-cdn.js')).size, 'bytes');
