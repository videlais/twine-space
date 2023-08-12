const Passage = require('../src/Passage.js');

describe('constructor()', () => {
  it('Should contain default values when initialized with no arguments', () => {
    const p = new Passage();
    expect(p.name).toBe('Default');
    expect(p.tags.length).toBe(0);
    expect(p.source).toBe('');
  });

  it('Should have passed in arguments', () => {
    const p = new Passage('test', ['tag1'], 'test');
    expect(p.source).toBe('test');
    expect(p.name).toBe('test');
    expect(p.tags.length).toBe(1);
  });
});
