// Description: E2E Test for Story.js
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

  it.todo('should find tw-storydata element');
  it.todo('should find tw-story element');
  it.todo('should find tw-passage element');
  it.todo('should apply style rules found in type="text/twine-css"');
  it.todo('should apply script found in type="text/twine-javascript"');
  it.todo('should load passages');
  it.todo('should load starting passage');
  it.todo('should navigate between passages by link');
  it.todo('should navigate to a passage by name');
  it.todo('should load Actors based on YAML in passages');
  it.todo('should clear meshes and load new Actors when navigating between passages');

  afterAll(() => {
    // Remove the bundle.
    shell.exec('rm ./test/e2e/Story/core.bundle.js');
  });
});
