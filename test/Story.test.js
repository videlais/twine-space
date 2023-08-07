import Story from '../src/Story';
import * as JQuery from "jquery";
const $ = JQuery.default;

describe('Story', () => {
  beforeEach(() => {
    document.body.innerHTML = `<tw-storydata name="Test" startnode="1" creator="test" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
        <tw-passagedata pid="2" name="Test Passage 2" tags="tag2">Hello world 2</tw-passagedata>
        <tw-passagedata pid="3" name="Test Passage 3" tags="tag3"><div><p><span>Test</span><p></div></tw-passagedata>
        <tw-passagedata pid="4" name="Test Passage 4" tags=""></tw-passagedata>
        <tw-passagedata pid="5" name="Test Passage 5" tags="">[[Test Passage]]</tw-passagedata>
        <tw-passagedata pid="6" name="Test Passage 6" tags=""><%= people.join(", "); %></tw-passagedata>
        <script type="text/twine-javascript">window.example = true;</script>
        <style type="text/twine-css">body {color: grey;}</style>
        </tw-storydata>
        <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
    // Create a new Story.
    window.story = new Story();
  });

  describe('constructor()', () => {
    it('Should set the story name from the element attribute', () => {
      expect(window.story.name).toBe('Test');
    });

    it('Should set the story creator from the element attribute', () => {
      expect(window.story.creator).toBe('test');
    });

    it('Should set the story creator version from the element attribute', () => {
      expect(window.story.creatorVersion).toBe('1.2.3');
    });
  });

  describe('getPassageByName()', () => {
    it('Should return null if passage name does not exist', () => {
      expect(window.story.getPassageByName('Nope')).toBe(null);
    });

    it('Should return passage if name exists', () => {
      const p = window.story.getPassageByName('Test Passage 3');
      expect(p.name).toBe('Test Passage 3');
    });
  });

  describe('getPassagesByTag()', () => {
    it('Should return empty array if none found', () => {
      const passages = window.story.getPassagesByTag('Nope');
      expect(passages.length).toBe(0);
    });

    it('Should return one passage', () => {
      const passages = window.story.getPassagesByTag('tag3');
      expect(passages.length).toBe(1);
    });

    it('Should return two passages', () => {
      const passages = window.story.getPassagesByTag('tag2');
      expect(passages.length).toBe(2);
    });
  });

  describe('show()', () => {
    it('Should throw error if passage is not found', () => {
      expect(() => window.story.show('Nope')).toThrow();
    });

    it('Should change contents of passageElement', () => {
      const originalContents = window.story.passageElement.html();
      window.story.show('Test Passage 2');
      const newContents = window.story.passageElement.html();
      expect(newContents).not.toBe(originalContents);
    });

    it('Should update passageElement', () => {
      window.story.show('Test Passage 2');
      const newContents = window.story.passageElement.html();
      expect(newContents).toBe('Hello world 2');
    });

    it('Should throw error on ejs problem', () => {
      expect(() => window.story.show("Test Passage 6")).toThrow();
    });
  });

  describe('start()', () => {
    it('Should load style', () => {
      window.story.start();
      expect($('style').length).toBe(2);
    });

    it('Should load script', () => {
      window.story.start();
      expect(window.example).toBe(true);
    });

    it('Should throw error if script fails', () => {
      document.body.innerHTML = `<tw-storydata name="Test" startnode="1" creator="test" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
        <tw-passagedata pid="2" name="Test Passage 2" tags="tag2">Hello world 2</tw-passagedata>
        <tw-passagedata pid="3" name="Test Passage 3" tags="tag3"><div><p><span>Test</span><p></div></tw-passagedata>
        <tw-passagedata pid="4" name="Test Passage 4" tags=""></tw-passagedata>
        <tw-passagedata pid="5" name="Test Passage 5" tags="">[[Test Passage]]</tw-passagedata>
        <script type="text/twine-javascript">window.example =</script>
        <style type="text/twine-css">body {color: grey;}</style>
        </tw-storydata>
        <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
      // Create a new Story.
      window.story = new Story();
      // Start story
      expect(() => window.story.start()).toThrow();
    });

    it('Should throw error if startnode does not match existing passages', () => {
      document.body.innerHTML = `<tw-storydata name="Test" startnode="2" creator="test" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
        <script type="text/twine-javascript"></script>
        <style type="text/twine-css"></style>
        </tw-storydata>
        <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
      // Create a new Story.
      window.story = new Story();
      // Start story
      expect(() => window.story.start()).toThrow();
    });

    it('Should run content in passages with "script" tag', () => {
      document.body.innerHTML =`<tw-storydata name="Test" startnode="2" creator="test" creator-version="1.2.3">
      <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
      <tw-passagedata pid="2" name="Test Passage 2" tags="script">window.example = true;</tw-passagedata>
      <script type="text/twine-javascript"></script>
      <style type="text/twine-css"></style>
      </tw-storydata>
      <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
      // Create a new Story.
      window.story = new Story();
      // Start story
      window.story.start();
      expect(window.example).toBe(true);
    });

    it('Should throw error if issue with passages with "script" tag', () => {
      document.body.innerHTML = `<tw-storydata name="Test" startnode="2" creator="test" creator-version="1.2.3">
      <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
      <tw-passagedata pid="2" name="Test Passage 2" tags="script">window.example =</tw-passagedata>
      <script type="text/twine-javascript"></script>
      <style type="text/twine-css"></style>
      </tw-storydata>
      <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
      // Create a new Story.
      window.story = new Story();
      // Start story
      expect(() => window.story.start()).toThrow();
    });
  });

  describe('include()', () => {
    it('Should return passage source by name', () => {
      expect(window.story.include('Test Passage 2')).toBe('Hello world 2');
    });

    it('Should throw error', () => {
      expect(() => window.story.include('Nope')).toThrow();
    });

    it('Should throw error', () => {
      expect(() => window.story.include('Nope')).toThrow();
    });
  });
});

describe('Story Events', () => {
  beforeEach(() => {
    document.body.innerHTML = `<tw-storydata name="Test" startnode="1" creator="test" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">[[Test Passage 2]]</tw-passagedata>
        <tw-passagedata pid="2" name="Test Passage 2" tags="tag2">Hello world 2</tw-passagedata>
        <script type="text/twine-javascript"></script>
        <style type="text/twine-css"></style>
        </tw-storydata>
        <tw-story class="centered"><tw-passage class="passage" aria-live="polite"></tw-passage></tw-story>`;
    // Create a new Story.
    window.story = new Story();
  });

  it('Should listen for reader clicking story link', () => {
    window.story.start();
    $('tw-link').trigger('click');
    expect(window.story.passageElement.html()).toBe('Hello world 2');
  });
});
