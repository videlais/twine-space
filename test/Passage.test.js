const Passage = require('../src/Passage.js');

describe('constructor()', () => {
  it('Should contain default values when initialized with no arguments', () => {
    const p = new Passage();
    expect(p.name).toBe('Default');
  });
});

describe('#render()', () => {
  it('Should render empty string', () => {
    const p = new Passage(1,'Default',[],'');
    expect(p.render()).toBe('');
  });

  it('Should ignore any <script> tags', () => {
    const p = new Passage(1,'Default',[],'<div><script>console.log("Hello world")</script></div>');
    expect(p.render()).toBe('<div><script>console.log("Hello world")</script></div>');
  });
});
