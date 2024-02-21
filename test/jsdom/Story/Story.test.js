// Description: Test for Story.js
import Story from '../../../src/Story.js';

describe('Story', () => {
    describe('constructor()', () => {
        it('should create a new Story object', () => {
            const story = new Story();
            expect(story).toBeInstanceOf(Story);
        });

        it('should set the storyDataElement property to null', () => {
            const story = new Story();
            expect(story.storyDataElement).toBeNull();
        });

        it('should set the name property to null', () => {
            const story = new Story();
            expect(story.name).toBeNull();
        });

        it('should set the passages property to an empty array', () => {
            const story = new Story();
            expect(story.passages).toEqual([]);
        });

        it('should set the storyElement property to null', () => {
            const story = new Story();
            expect(story.storyElement).toBeNull();
        });

        it('should set the userScripts property to an empty array', () => {
            const story = new Story();
            expect(story.userScripts).toEqual([]);
        });

        it('should set the userStyles property to an empty array', () => {
            const story = new Story();
            expect(story.userStyles).toEqual([]);
        });

        it('should set passageElement to null', () => {
            const story = new Story();
            expect(story.passageElement).toBeNull();
        });

        it('should set the storyDataElement property to the tw-storydata element', () => {
            document.body.innerHTML = '<tw-storydata name="Test"></tw-storydata>';
            const story = new Story();
            expect(story.storyDataElement).not.toBe(null);
        });

        it('should set the name property to the name attribute of the tw-storydata element', () => {
            document.body.innerHTML = '<tw-storydata name="Test"></tw-storydata>';
            const story = new Story();
            expect(story.name).toBe('Test');
        });

        it('should set the passages property to an array of Passage objects', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="" name="Passage 1"></tw-passagedata>
                    <tw-passagedata pid="2" tags="" name="Passage 2"></tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            expect(story.passages.length).toBe(2);
            expect(story.passages[0].name).toBe('Passage 1');
            expect(story.passages[1].name).toBe('Passage 2');
        });

        it('should combine userScript elements into an array', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <script type="text/twine-javascript">console.log('User script 1');</script>
                    <script type="text/twine-javascript">console.log('User script 2');</script>
                </tw-storydata>
            `;
            const story = new Story();
            expect(story.userScripts.length).toBe(2);
            expect(story.userScripts[0]).toBe("console.log('User script 1');");
            expect(story.userScripts[1]).toBe("console.log('User script 2');");
        });

        it('should combine userStylesheet elements into an array', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <style type="text/twine-css">body { background-color: red; }</style>
                    <style type="text/twine-css">body { color: white; }</style>
                </tw-storydata>
            `;
            const story = new Story();
            expect(story.userStyles.length).toBe(2);
            expect(story.userStyles[0]).toBe('body { background-color: red; }');
            expect(story.userStyles[1]).toBe('body { color: white; }');
        });

        it('should set the storyElement property to the tw-story element', () => {
            document.body.innerHTML = '<tw-story></tw-story>';
            const story = new Story();
            expect(story.storyElement).not.toBe(null);
        });

        it('should set the passageElement property to the tw-passage element', () => {
            document.body.innerHTML = '<tw-passage></tw-passage>';
            const story = new Story();
            expect(story.passageElement).not.toBe(null);
        });
    });

    describe('getPassageByName()', () => {
        it('should return a Passage object with the given name', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="" name="Passage 1"></tw-passagedata>
                    <tw-passagedata pid="2" tags="" name="Passage 2"></tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            const passage = story.getPassageByName('Passage 1');
            expect(passage.name).toBe('Passage 1');
        });

        it('should return null if no passage with the given name exists', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="" name="Passage 1"></tw-passagedata>
                    <tw-passagedata pid="2" tags="" name="Passage 2"></tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            const passage = story.getPassageByName('Passage 3');
            expect(passage).toBeNull();
        });
    });

    describe('getPassagesByTag()', () => {
        it('should return an array of Passage objects with the given tag', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1"></tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2"></tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3"></tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            const passages = story.getPassagesByTag('tag1');
            expect(passages.length).toBe(2);
            expect(passages[0].name).toBe('Passage 1');
            expect(passages[1].name).toBe('Passage 3');
        });

        it('should return an empty array if no passages with the given tag exist', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1"></tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2"></tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3"></tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            const passages = story.getPassagesByTag('tag3');
            expect(passages.length).toBe(0);
        });
    });

    describe('include()', () => {
        it('should return source of passage', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2">TestB</tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3">TestC</tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            const source = story.include('Passage 1');
            expect(source).toBe('TestA');
        });

        it('should throw an error if the passage does not exist', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2">TestB</tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3">TestC</tw-passagedata>
                </tw-storydata>
            `;
            const story = new Story();
            expect(() => story.include('Passage 4')).toThrow('Error: Passage does not exist!');
        });
    });

    describe('start()', () => {

        let story = null;
      
        afterEach(() => {
            // Restore all mocks.
            jest.restoreAllMocks();
        });

        it('should add userScripts to the body as script elements', () => {
            document.body.innerHTML = `
                <tw-storydata startnode="1" name="Test">
                    <script role="script" type="text/twine-javascript">console.log('User script 1');</script>
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                </tw-storydata>
            `;
            story = new Story();
            jest.spyOn(story, 'show').mockImplementation();
            story.start();
            expect(document.querySelectorAll('script').length).toBe(2);
            expect(story.show).lastCalledWith('Passage 1');
        });

        it('should add userStyles to the head as style elements', () => {
            document.body.innerHTML = `
                <tw-storydata startnode="1" name="Test">
                    <style role="stylesheet" id="twine-user-style" type="text/twine-css">body { background-color: red; }</style>
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                </tw-storydata>
            `;
            story = new Story();
            jest.spyOn(story, 'show').mockImplementation();
            story.start();
            expect(document.querySelectorAll('style').length).toBe(2);
            expect(story.show).lastCalledWith('Passage 1');
        });

        it('should throw an error if the startnode attribute does not exist', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                </tw-storydata>
            `;
            story = new Story();
            expect(() => story.start()).toThrow('Error: The startnode attribute cannot be found!');
        });

        it('should throw an error if starting passage does not exist', () => {
            document.body.innerHTML = `
                <tw-storydata startnode="2" name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                </tw-storydata>
            `;
            story = new Story();
            expect(() => story.start()).toThrow('Error: Starting passage does not exist!');
        });
    });

    describe('show()', () => {
        it('should throw an error if the passage does not exist', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2">TestB</tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3">TestC</tw-passagedata>
                </tw-storydata>
                <tw-passage></tw-passage>
            `;
            const story = new Story();
            expect(() => story.show('Passage 4')).toThrow('Error: There is no passage with the name "Passage 4"!');
        });

        it('should set tags on the passage element', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2">TestB</tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3">TestC</tw-passagedata>
                </tw-storydata>
                <tw-passage></tw-passage>
            `;
            const story = new Story();
            story.show('Passage 3');
            expect(document.querySelector('tw-passage').getAttribute('tags')).toBe('tag1,tag2');
        });

        it('should set the innerHTML of the passage element to the source of the passage', () => {
            document.body.innerHTML = `
                <tw-storydata name="Test">
                    <tw-passagedata pid="1" tags="tag1" name="Passage 1">TestA</tw-passagedata>
                    <tw-passagedata pid="2" tags="tag2" name="Passage 2">TestB</tw-passagedata>
                    <tw-passagedata pid="3" tags="tag1 tag2" name="Passage 3">TestC</tw-passagedata>
                </tw-storydata>
                <tw-passage></tw-passage>
            `;
            const story = new Story();
            story.show('Passage 1');
            expect(document.querySelector('tw-passage').innerHTML).toBe('TestA');
        });
    });

    describe('Warnings', () => {

        beforeEach(() => {
            // Mock console.warn.
            jest.spyOn(console, 'warn').mockImplementation();
        });
      
        afterEach(() => {
            // Restore all mocks.
            jest.restoreAllMocks();
        });

        it('should warn if the tw-storydata element does not exist', () => {
            document.body.innerHTML = `<html>
                <body>
                    <tw-story>
                        <tw-passage class="passage" aria-live="polite"></tw-passage>
                    </tw-story>
                    <tw-passagedata></tw-passagedata>
                </body>
            </html>`;
            const story = new Story();
            expect(console.warn).toHaveBeenCalledWith('Warning: tw-storydata element does not exist!');
        });

        it('should warn if tw-passagedata elements do not exist', () => {
            document.body.innerHTML = `<html>
                <body>
                    <tw-story>
                        <tw-passage class="passage" aria-live="polite"></tw-passage>
                    </tw-story>
                </body>
            </html>`;
            const story = new Story();
            expect(console.warn).toHaveBeenCalledWith('Warning: tw-passagedata elements do not exist!');
        });

        it('should warn if tw-story element does not exist', () => {
            document.body.innerHTML = `<html>
                <body>
                    <tw-passagedata></tw-passagedata>
                </body>
            </html>`;
            const story = new Story();
            expect(console.warn).toHaveBeenCalledWith('Warning: tw-story element does not exist!');
        });

        it('should warn if tw-passage element does not exist', () => {
            document.body.innerHTML = `<html>
                <body>
                    <tw-story></tw-story>
                </body>
            </html>`;
            const story = new Story();
            expect(console.warn).toHaveBeenCalledWith('Warning: tw-passage element does not exist!');
        });
    });
});
