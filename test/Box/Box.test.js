// Description: Test for Box.js
import shell from 'shelljs';
import Director from '../../src/Director.js';
import "expect-puppeteer";

describe('Box', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/Box/webpack.config.cjs');
    
    // Start a new browser.
    await page.goto(`http://localhost:3000/Box/index.html`);
  });

  describe('Creation', () => {

    afterEach(async () => {
      await page.evaluate(() => {
        // After each test, clear the scene.
        Director.clearScene();
      });
    });

    it('Should do nothing if there is no scene', async () => {
      const scene = await page.evaluate(() => {
        Director.Shapes.Box('box');
        return Director.scene;
      });
  
      expect(scene).toBe(null);
    });

    it('Should create a single box with default values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Shapes.Box('box');
        return Director.scene.meshes.length;
      });
  
      expect(meshCount).toBe(1);
    });
  
    it('Should create a single box with custom values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Shapes.Box('box', {x: 1, y: 2, z: 3}, {width: 4, height: 5, depth: 6});
        return Director.scene.meshes.length;
      });
  
      expect(meshCount).toBe(1);
    });
  });
});
