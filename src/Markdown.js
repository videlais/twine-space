// Require AFrameProxy
const AFrameProxy = require('./AFrameProxy.js');

class Markdown {
    static parse (text) {
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
          AFrameProxy.add('box', 'position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"');
          return '';
        }],
        // Break Rule
        [/[\r\n\n]/g, '<br>']
      ];
  
      rules.forEach(([rule, template]) => {
        text = text.replace(rule, template);
      });
  
      return text;
    }

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
          text = text.replace(rule, template);
      });
    
      return text;
    }
  }
  
  module.exports = Markdown;
  