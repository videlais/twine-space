import { parse } from '../../../src/Parse/Links.js';

describe('Parse/Links', () => {
  describe('parse()', () => {
    it('Should force string conversion if input is not a string', () => {
      const result = parse(null);
      expect(result).toBe('null');
    });

    it('Should produce classic link', () => {
      expect(parse('[[dest]]')).toBe('<tw-link role="link" data-passage="dest">dest</tw-link>');
    });

    it('Should produce bar link', () => {
      expect(parse('[[rename|dest]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });

    it('Should produce right arrow link', () => {
      expect(parse('[[rename->dest]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });

    it('Should produce left arrow link', () => {
      expect(parse('[[dest<-rename]]')).toBe('<tw-link role="link" data-passage="dest">rename</tw-link>');
    });
  });
});
