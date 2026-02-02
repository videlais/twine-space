// Description: Test for Sphere.js
import shell from 'shelljs';
import Director from '../../../src/Director.js';
import 'expect-puppeteer';

describe('Sphere', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/e2e/Sphere/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/e2e/Sphere/index.html');
    
    // Wait for jQuery to be loaded
    await page.evaluate(async () => {
      await window.jQueryReady;
    });
  });

  describe('Self-creation', () => {
    afterEach(async () => {
      await page.evaluate(async () => {
        await window.jQueryReady;
        // After each test, clear the scene.
        Director.clearScene();
      });
    });

    it('Should return null if there is no scene', async () => {
      const plane = await page.evaluate(() => {
        return Director.Actors.Sphere('sphere');
      });

      expect(plane).toBe(null);
    });

    it('Should create a single sphere with default values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Sphere('sphere');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create a single sphere with custom values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Sphere('sphere', { diameter: 4, segments: 32, position: { x: 1, y: 2, z: 3 } });
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create multiple spheres', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Sphere('sphere1');
        Director.Actors.Sphere('sphere2');
        Director.Actors.Sphere('sphere3');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(3);
    });
  });

  afterAll(() => {
    // Remove the bundle.
    shell.exec('rm ./test/e2e/Sphere/core.bundle.js');
  });
});
