// Require AFrameProxy
const AFrameProxy = require('./aframe-build/AFrameProxy.js');

/**
 * Rules for unescaping and parsing author content from passages
 *  into visual effects and content for readers.
 * 
 * @class Markdown
 */
class Markdown {
    /**
    * Parse text. Convert authored markdown symbols into
    *  visual effects and content for readers.
    *
    * @function parse
    * @param {string} text - Text to parse
    * @static
    */
    static parse (text) {
      // Remove any a-scene elements, if they exist
      AFrameProxy.removeScene();

      const rules = [
        // [[rename|destination]]
        [/\[\[(.*?)\|(.*?)\]\]/g, '<a role="link" data-passage="$2">$1</a>'],
        // [[rename->dest]]
        [/\[\[(.*?)->(.*?)\]\]/g, '<a role="link" data-passage="$2">$1</a>'],
        // [[dest<-rename]]
        [/\[\[(.*?)<-(.*?)\]\]/g, '<a role="link" data-passage="$1">$2</a>'],
        // [[destination]]
        [/\[\[(.*?)\]\]/g, '<a role="link" data-passage="$1">$1</a>'],
        // (box:)
        [/\((box:)\)/g, () => {
          AFrameProxy.createScene();
          AFrameProxy.add('box', 'position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"');
          return '';
        }],
        // Break Rule
        [/[\r\n\n]/g, '<br>']
      ];
  
      rules.forEach(([rule, template]) => {
        text = text.replaceAll(rule, template);
      });
  
      return text;
    }

    /**
    * Unescape content. 
    *
    * @function unescape
    * @param {string} text - Text to parse
    * @static
    */
    static unescape(text) {
      const unescapeSequences = [
          ['&amp;', '&'],
          ['&lt;', '<'],
          ['&gt;', '>'],
          ['&quot;', '"'],
          ['&#x27;', "'"],
          ['&#x60;', '`']
      ];

      unescapeSequences.forEach(([rule, template]) => {
          text = text.replaceAll(rule, template);
      });
    
      return text;
    }
  }
  
  module.exports = Markdown;
  