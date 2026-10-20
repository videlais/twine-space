import { parse } from '../../../src/Parse/Scene/index.js';

describe('Parse/Scene', () => {
  describe('parse', () => {
    it('Should return an object with an empty array and the original text if no YAML is present', () => {
      const result = parse('Hello, world!');
      expect(result).toEqual({
        objects: [],
        text: 'Hello, world!'
      });
    });

    it('Should return an object with an array of objects and the original text if YAML is present', () => {
      const result = parse(`
      - foo:
            bar
        ---
        Hello, world!`);
      expect(result).toEqual({
        objects: [{ foo: 'bar' }],
        text: '\nHello, world!'
      });
    });

    it('Should preserve passage text after subsequent horizontal rules', () => {
      const result = parse('- box:\n    name: Box\n---\nBefore rule\n---\nAfter rule');
      expect(result).toEqual({
        objects: [{ box: { name: 'Box' } }],
        text: '\nBefore rule\n—\nAfter rule'
      });
    });

    it('Should not treat an inline sequence of dashes as a scene delimiter', () => {
      const result = parse('Keep --- this text');
      expect(result).toEqual({
        objects: [],
        text: 'Keep — this text'
      });
    });

    it('Should return empty array and empty string if no text is provided', () => {
      const result = parse();
      expect(result).toEqual({
        objects: [],
        text: ''
      });
    });

    it('Should force type coercion if text is not a string', () => {
      const result = parse(123);
      expect(result).toEqual({
        objects: [],
        text: '123'
      });
    });
  });
});
