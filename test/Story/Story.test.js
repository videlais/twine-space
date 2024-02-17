// Description: Test for Story.js
import shell from 'shelljs';
import Story from '../../src/Story.js';

describe('Story', () => {

    beforeAll(async () => {
        // Use webpack to bundle Story.js.
        shell.exec('npx webpack --config ./test/Story/webpack.config.cjs');
    
        // Start a new browser.
        await page.goto('http://localhost:3000/Story/index.html');
    });

    describe('window.story', () => {

        it('Should exist', async () => {
            const story = await page.evaluate(() => {
                return window.story;
            });
            expect(story).toBeTruthy();
        });

        describe('storyDataElement', () => {
            it('Should exist', async () => {
                const storyDataElement = await page.evaluate(() => {
                    return window.story.storyDataElement;
                });
                expect(storyDataElement).toBeTruthy();
            });
        });

        it('Should have a name', async () => {
            const name = await page.evaluate(() => {
                return window.story.name;
            });
            expect(name).toBeTruthy();
        });

        it('Should have passages', async () => {
            const passages = await page.evaluate(() => {
                return window.story.passages;
            });
            expect(passages).toBeTruthy();
        });

        it('Should have userScripts', async () => {
            const userScripts = await page.evaluate(() => {
                return window.story.userScripts;
            });
            expect(userScripts).toBeTruthy();
        });

        it('Should have userStyles', async () => {
            const userStyles = await page.evaluate(() => {
                return window.story.userStyles;
            });
            expect(userStyles).toBeTruthy();
        });

        it('Should have storyElement', async () => {
            const storyElement = await page.evaluate(() => {
                return window.story.storyElement;
            });
            expect(storyElement).toBeTruthy();
        });
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

    it('Should produce warning if tw-storydata is missing', async () => {
        // Start a new browser.
        await page.goto('http://localhost:3000/Story/Warnings/missingStoryElement.html');
        // Expect warning.
        expect(console.warn).toHaveBeenCalledWith('Warning: tw-storydata element does not exist!');
    });
});