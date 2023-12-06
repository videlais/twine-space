 /**
   * ParseLinks
   * Translates Twine links into `<tw-link>` HTML links.
   * @function parseLinks
   * @param {string} text - Text to parse.
   * @returns {string} Parsed text with links.
   */
 export default function ParseLinks (text) {
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
