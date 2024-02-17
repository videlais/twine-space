import { parse as parseYAML } from '../../../src/Parse/YAML.js';

describe('Parse/YAML', () => {
  describe('parse()', () => {
    it('Should produce empty array when no YAML detected', () => {
      const result = parseYAML('No YAML here.');
      expect(result).toEqual([]);
    });

    it('Should produce error property on first entry of result array if parsing YAML failed', () => {
      const result = parseYAML(null);
      const error = Object.prototype.hasOwnProperty.call(result[0], 'error');
      expect(error).toBe(true);
    });

    it('Should have a single entry with single YAML entry', () => {
      const source = '- foo: bar';
      const result = parseYAML(source);
      expect(result.length).toBe(1);
    });

    it('Should translate YAML entry into foo property of first array entry', () => {
      const source = `- foo:
            bar`;
      const result = parseYAML(source);
      const annotation = Object.prototype.hasOwnProperty.call(result[0], 'foo');
      expect(annotation).toBe(true);
    });

    it('Should translate YAML entry into annotation.title property of first array entry', () => {
      const source = `- annotation:
            title: Shed`;
      const result = parseYAML(source);
      const annotation = Object.prototype.hasOwnProperty.call(result[0].annotation, 'title');
      expect(annotation).toBe(true);
    });
  });
});
