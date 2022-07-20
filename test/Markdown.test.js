const Markdown = require('../src/Markdown.js');
const Story = require('../src/Story.js');
const $ = require('jquery');

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

    it('Should embed scene', () => {
      $(document.body).html(`<tw-storydata name="Test" startnode="1" creator="test" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="">Hello world</tw-passagedata>
        <tw-passagedata pid="2" name="Test Passage 2" tags=""><p>Test!</p></tw-passagedata>
        <script type="text/twine-javascript"></script>
        <style type="text/twine-css"></style>
        </tw-storydata>
        <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`);
        // Create a new Story.
        window.story = new Story();
        Markdown.parse('(embed-scene: "Test Passage 2")');
        expect($('body > p').text()).toBe("Test!");
    });
  });

  describe('unescape()', () => {
    it('Should unescape HTML', () => {
      expect(Markdown.unescape('&lt;p&gt;Test&lt;/p&gt;')).toBe('<p>Test</p>');
    });
  });

  describe('AFrame parsing', () => {
    it('Should create <a-scene>', () => {
      Markdown.parse('(sky: color="#001337")');
      expect($('a-scene').length).toBe(1);
    });

    it('Should create <a-sky>', () => {
      Markdown.parse('(sky: color="#001337")');
      expect($('a-sky').length).toBe(1);
    });

    it('Should create <a-sky> and <a-text>', () => {
      Markdown.parse('(sky: color="#001337")(text: position="-1 0.5 -3" color="#4CC3D9" updater)');
      expect($('a-sky').length).toBe(1);
      expect($('a-text').length).toBe(1);
    });

    it('Should create <a-sky>[<a-text>]', () => {
      Markdown.parse('(sky: color="#001337")[(text: position="-1 0.5 -3" color="#4CC3D9" updater)]');
      expect($('a-sky').length).toBe(1);
      expect($('a-text').length).toBe(1);
      expect($('a-sky > a-text').length).toBe(1);
    });
  });
});
