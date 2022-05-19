const $ = require('jquery');
const Story = require('../src/Story.js');

describe('Story', () => {
    let story;

    beforeEach(() => {
        $(document.body).html(`<tw-storydata name="Test" startnode="1" creator="jasmine" creator-version="1.2.3">
        <tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata>
        <tw-passagedata pid="2" name="Test Passage 2" tags="tag1 tag2">Hello world 2</tw-passagedata>
        <tw-passagedata pid="3" name="Test Passage 3" tags=""><div><p><span>Test</span><p></div></tw-passagedata>
        <tw-passagedata pid="4" name="Test Passage 4" tags=""><% print(; %></tw-passagedata>
        <tw-passagedata pid="5" name="Test Passage 5" tags="">[[Test Passage]]</tw-passagedata>
        <script type="text/twine-javascript">window.scriptRan = true;</script>
        <style type="text/twine-css">body { color: blue }</style>
        </tw-storydata>`);

        story = new Story();
  });

    describe('constructor()', () => {
        it('Should set the story name from the element attribute', () => {
            expect(story.name).toBe('Test');
        });

        it('Should set the story creator from the element attribute', () => {
            expect(story.creator).toBe('jasmine');
        });

        it('Should set the story creator version from the element attribute', () => {
            expect(story.creatorVersion).toBe('1.2.3');
        });

        it('Should set startPassage to parseInt(startNode)', () => {
            expect(story.startPassage).toBe(1);
        });
    });

    describe('getPassageByName()', () => {
        it("Should return passage by name if it exists in array", () => {
            expect(story.getPassageByName("Test Passage").name).toBe("Test Passage");
        });

        it("Should return null if passage does not exist", () => {
            expect(story.getPassageByName("Testing")).toBe(null);
        });
    });

    describe('getPassageById()', () => {
        it("Should return passage by id if it exists in array", () => {
            expect(story.getPassageById(3).name).toBe("Test Passage 3");
        });

        it("Should return null if passage does not exist", () => {
            expect(story.getPassageById(10)).toBe(null);
        });
    });

    describe('show()', () => {
        it('Show throw error if passage does not exist', () => {
            expect(() => {
                story.show("Testing");
            }).toThrow();
        });

        it('Show throw error if passage does not exist', () => {
            story.show("Test Passage 2");
            expect($(story.passageElement).html()).toBe('Hello world 2');
        });
    });

    describe('start()', () => {
        it('Should load start passage', () => {
            story.start();
            expect($(story.passageElement).html()).toBe('Hello world');
        });
    });
});
