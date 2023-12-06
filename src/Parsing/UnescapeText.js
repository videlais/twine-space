/**
  * Unescape text.
  * @function unescape
  * @param {string} text - Text to unescape.
  * @returns {string} - Unescaped text.
*/
export default function UnescapeText (text) {
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
