const Markdown = require('../src/Markdown.js');

describe('Markdown class', () => {
  describe('parse()', () => {
    it('Should produce classic link', () => {
      expect(Markdown.parse('[[dest]]')).toBe('<tw-link role="link" data-passage="dest">dest</tw-link>');
    });

    it('Should produce bar link', () => {
      expect(Markdown.parse('[[rename|dest]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });

    it('Should produce right arrow link', () => {
      expect(Markdown.parse('[[rename->dest]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });

    it('Should produce left arrow link', () => {
      expect(Markdown.parse('[[dest<-rename]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });
  });

  describe('unescape()', () => {
    it('Should unescape HTML', () => {
      expect(Markdown.unescape('&lt;p&gt;Test&lt;/p&gt;')).toBe('<p>Test</p>');
    });
  });
});
