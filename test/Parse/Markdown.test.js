import { parse as parseMarkdown } from '../../src/Parse/Markdown.js';

describe('Parse/Markdown', () => {
  describe('parse()', () => {
    it('Should force string conversion if input is not a string', () => {
      const result = parseMarkdown(null);
      expect(result).toBe('null');
    });

    it('Should do nothing when no Markdown detected', () => {
      const result = parseMarkdown('No Markdown here.');
      expect(result).toBe('No Markdown here.');
    });

    it('Should parse Markdown emphasis into in-line HTML without paragraph element', () => {
      const markdown = 'This is *Markdown*';
      const html = parseMarkdown(markdown);
      expect(html).toBe('This is <em>Markdown</em>');
    });
  });
});
