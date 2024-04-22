import { parse} from '../../../src/Parse/HTML.js';

describe('parse', () => {
  describe('when text is a string', () => {
    it('returns the text with unescaped characters', () => {
      const text = '&lt;';

      expect(parse(text)).toEqual('<');
    });

    it('returns the text with unescaped characters', () => {
      const text = '&gt;';

      expect(parse(text)).toEqual('>');
    });

    it('returns the text with unescaped characters', () => {
      const text = '&quot;';

      expect(parse(text)).toEqual('"');
    });

    it('returns the text with unescaped characters', () => {
      const text = '&#039;';

      expect(parse(text)).toEqual("'");
    });

    it('returns the text with unescaped characters', () => {
      const text = '&amp;';

      expect(parse(text)).toEqual('&');
    });
  });

  describe('when text is not a string', () => {
    it('returns the text with unescaped characters', () => {
      const text = 1;

      expect(parse(text)).toEqual('1');
    });
  });
});
