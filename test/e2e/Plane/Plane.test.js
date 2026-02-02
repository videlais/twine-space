// Description: Test for Sphere.js
import shell from 'shelljs';
import Director from '../../../src/Director.js';
import 'expect-puppeteer';

describe('Plane', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/e2e/Plane/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/e2e/Plane/index.html');
    
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

    it('Should do nothing if there is no scene', async () => {
      const scene = await page.evaluate(() => {
        Director.Actors.Plane('plane');
        return Director.scene;
      });

      expect(scene).toBe(null);
    });

    it('Should create a single plane with default values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Plane('plane');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create a single plane with custom values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Plane('plane', { width: 4, height: 5, position: { x: 1, y: 2, z: 3 } });
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create multiple planes', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Plane('plane1');
        Director.Actors.Plane('plane2');
        Director.Actors.Plane('plane3');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(3);
    });
  });

  afterAll(() => {
    // Remove the bundle.
    shell.exec('rm ./test/e2e/Plane/core.bundle.js');
  });
});
