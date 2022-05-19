const Markdown = require('../src/Markdown.js');

describe('Markdown class', () => {
  test('Should produce classic link', () => {
    expect(Markdown.parse('[[dest]]')).toBe('<a role="link" data-passage="dest">dest</a>');
  });

  test('Should produce bar link', () => {
    expect(Markdown.parse('[[rename|dest]]')).toBe('<a role="link" data-passage="dest">rename</a>');
  });

  test('Should produce right arrow link', () => {
    expect(Markdown.parse('[[rename->dest]]')).toBe('<a role="link" data-passage="dest">rename</a>');
  });

  test('Should produce left arrow link', () => {
    expect(Markdown.parse('[[dest<-rename]]')).toBe('<a role="link" data-passage="dest">rename</a>');
  });
});
