// Description: E2E Test for Story.js
import shell from 'shelljs';
import $ from 'jquery';
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

  describe('constructor()', () => {
    it('should parse tw-storydata name', async () => {
      const name = await page.evaluate(() => {
        return window.story.name;
      });

      expect(name).toBe('Story');
    });

    it('should find tw-storydata element', async () => {
      const storyDataElement = await page.evaluate(() => {
        return window.story.storyDataElement;
      });

      expect(storyDataElement).not.toBeNull();
    });

    it('should find tw-story element', async () => {
      const storyElement = await page.evaluate(() => {
        return window.story.storyElement;
      });

      expect(storyElement).not.toBeNull();
    });

    it('should find tw-passage element', async () => {
      const passageElement = await page.evaluate(() => {
        return window.story.passageElement;
      });

      expect(passageElement).not.toBeNull();
    });

    it('should populate passages array', async () => {
      const passages = await page.evaluate(() => {
        return window.story.passages;
      });

      expect(passages.length).toBe(2);
    });

    it('should populate userScripts array', async () => {
      const userScripts = await page.evaluate(() => {
        return window.story.userScripts;
      });

      expect(userScripts.length).toBe(1);
    });

    it('should populate userStyles array', async () => {
      const userStyles = await page.evaluate(() => {
        return window.story.userStyles;
      });

      expect(userStyles.length).toBe(1);
    });
  });

  describe('start()', () => {
    afterEach(async () => {
      // Reload the page after each test.
      await page.reload();

      // Wait for the page to load.
      await page.evaluate(() => {
        // (Re)start the story.
        window.story.start();
      });
    });

    it('should load starting passage', async () => {
      const passage = await page.evaluate(() => {
        return $('tw-passage').html();
      });

      expect(passage).toBe('<p><tw-link role="link" data-passage="Next">Next</tw-link></p>');
    });

    it('should apply style rules found in type="text/twine-css"', async () => {
      const style = await page.evaluate(() => {
        return window.getComputedStyle(window.story.storyElement).backgroundColor;
      });

      expect(style).toBe('rgba(0, 0, 0, 0)');
    });

    it('should apply script found in type="text/twine-javascript"', async () => {
      const script = await page.evaluate(() => {
        return window.story.userScripts[0];
      });

      expect(script).toBe('window.example = "Test";');
    });
  });

  describe('getPassageByName()', () => {
    it('should return a passage by name', async () => {
      const passage = await page.evaluate(() => {
        return window.story.getPassageByName('Next');
      });

      expect(passage).not.toBeNull();
    });
  });

  describe('getPassagesByTag()', () => {
    it('should return passages by tag', async () => {
      const passages = await page.evaluate(() => {
        return window.story.getPassagesByTag('tag1');
      });

      expect(passages.length).toBe(1);
    });

    it('should return an empty array if no passages are found', async () => {
      const passages = await page.evaluate(() => {
        return window.story.getPassagesByTag('tag3');
      });

      expect(passages.length).toBe(0);
    });
  });

  describe('Navigation by link between passages', () => {
    beforeEach(async () => {
      // Wait for the page to load.
      await page.evaluate(() => {
        // (Re)start the story.
        window.story.start();
      });
    });

    it('should navigate to a passage by link', async () => {
      // Click the link.
      await page.click('tw-link[data-passage]');

      // Return the passage.
      const passage = await page.evaluate(() => {
        return $('tw-passage').html();
      });

      expect(passage).toBe('<p><tw-link role="link" data-passage="Start">Start</tw-link></p>');
    });
  });

  it.todo('should navigate between passages by link');
  it.todo('should navigate to a passage by name');
  it.todo('should load Actors based on YAML in passages');
  it.todo('should clear meshes and load new Actors when navigating between passages');

  afterAll(() => {
    // Remove the bundle.
    shell.exec('rm ./test/e2e/Story/core.bundle.js');
    // Remove created CSS.
    shell.exec('rm ./test/e2e/Story/core.css');
  });
});
