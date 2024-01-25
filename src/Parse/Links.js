 /**
   * parse - translates Twine links into `<tw-link>` HTML links.
   * 
   * (To avoid type issues, this function will force conversion of the input into a string.)
   * 
   * @example
   * `[[foo]]`
   * // Returns `<tw-link role="link" data-passage="foo">foo</tw-link>`
   * 
   * `[[foo->bar]]`
   * // Returns `<tw-link role="link" data-passage="bar">foo</tw-link>`
   * 
   * `[[foo<-bar]]`
   * // Returns `<tw-link role="link" data-passage="foo">bar</tw-link>`
   * 
   * `[[foo|bar]]`
   * // Returns `<tw-link role="link" data-passage="bar">foo</tw-link>`
   * 
   * @function parse
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text with links.
   */
function parse (text) {
  // Test if text is a string.
  if(typeof text !== 'string') {
    // Force conversion to string.
    text = String(text);
  }

    // Rules for translation.
    const rules = [
      // [[rename|destination]]
      [/\[\[(.*?)\|(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[rename->dest]]
      [/\[\[(.*?)->(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</tw-link>'],
      // [[dest<-rename]]
      [/\[\[(.*?)<-(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$2</tw-link>'],
      // [[destination]]
      [/\[\[(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$1</tw-link>']
    ];

    // For each rule, translate Twine syntax into HTML.
    rules.forEach(([rule, template]) => {
      // Replace the rule with the template.
      text = text.replace(rule, template);
    });

    // Return the translated text.
    return text;
}

export { parse };
