// Description: Test for Story.js
import shell from 'shelljs';
import 'expect-puppeteer';

describe('Story', () => {
    beforeAll(async () => {
        // Use webpack to bundle index.js.
        shell.exec('npx webpack --config ./test/e2e/Story/webpack.config.cjs');
    
        // Start a new browser.
        await page.goto('http://localhost:3000/e2e/Story/index.html');
    });

    beforeEach(async () => {
        // Reload the page before each test.
        await page.reload();

        // Wait for the page to load.
        await page.evaluate(() => {
            // (Re)start the story.
            window.story.start();
        });
    });

    it('should parse tw-storydata name', async () => {
        const name = await page.evaluate(() => {
            return window.story.name;
        });

        expect(name).toBe('Story');
    });
});
