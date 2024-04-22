/**
 * Parses unescaped characters into HTML entities.
 * 
 * (To avoid type issues, this function will force conversion of the input into a string.)
 * 
 * @example
 * `&lt;` -> `<`
 * 
 * @function parse
 * @param {string} text - Text to parse.
 * @returns {string} Parsed text with unescaped characters.
 */
function parse (text) {
  // Test if text is a string.
  if(typeof text !== 'string') {
    // Force conversion to string.
    text = String(text);
  }

  // Rules for translation.
  const rules = [
    // Unescape characters.
    [/&amp;/g, '&'],
    [/&lt;/g, '<'],
    [/&gt;/g, '>'],
    [/&quot;/g, '"'],
    [/&#039;/g, "'"]
  ];

  // For each rule, translate escaped characters into HTML entities.
  rules.forEach(([rule, template]) => {
    // Replace the rule with the template.
    text = text.replace(rule, template);
  });

  // Return the translated text.
  return text;
}

export { parse };