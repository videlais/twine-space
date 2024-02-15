// Description: Test for Sphere.js
import shell from 'shelljs';
import Director from '../../src/Director.js';
import 'expect-puppeteer';

describe('Plane', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/Plane/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/Plane/index.html');
  });

  describe('Self-creation', () => {
    afterEach(async () => {
      await page.evaluate(() => {
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
        Director.Actors.Plane('plane', { x: 1, y: 2, z: 3 }, { width: 4, height: 5 });
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
});
