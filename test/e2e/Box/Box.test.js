// Description: Test for Box.js
import shell from 'shelljs';
import Director from '../../../src/Director.js';
import 'expect-puppeteer';

describe('Box', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/e2e/Box/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/e2e/Box/index.html');
  });

  describe('Self-creation', () => {
    afterEach(async () => {
      await page.evaluate(() => {
        // After each test, clear the scene.
        Director.clearScene();
      });
    });

    it('Should return null if there is no scene', async () => {
      const mesh = await page.evaluate(() => {
        return Director.Actors.Box('box');
      });

      expect(mesh).toBe(null);
    });

    it('Should create a single box with default values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Box('box');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create a single box with custom values', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Box('box', { width: 4, height: 5, depth: 6, position: { x: 1, y: 2, z: 3 } });
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(1);
    });

    it('Should create multiple boxes', async () => {
      const meshCount = await page.evaluate(() => {
        Director.createScene();
        Director.Actors.Box('box1');
        Director.Actors.Box('box2');
        Director.Actors.Box('box3');
        return Director.scene.meshes.length;
      });

      expect(meshCount).toBe(3);
    });

    it('Should create a single box with a name', async () => {
      const name = await page.evaluate(() => {
        Director.createScene();
        return Director.Actors.Box('box').name;
      });

      expect(name).toBe('box');
    });

    it('Should create a single box with a position', async () => {
      const mesh = await page.evaluate(() => {
        Director.createScene();
        const m = Director.Actors.Box('box', { position: { x: 1, y: 2, z: 3 } });
        return { x: m.position.x, y: m.position.y, z: m.position.z };
      });

      expect(mesh.x).toBe(1);
      expect(mesh.y).toBe(2);
      expect(mesh.z).toBe(3);
    });

    it('Should create a single box with a width', async () => {
      const width = await page.evaluate(() => {
        Director.createScene();
        const m = Director.Actors.Box('box', { width: 4, position: { x: 1, y: 2, z: 3 } });
        // Access the bounding box's extendSize (centered at the origin, so multiply by 2 to get the width).
        return m.getBoundingInfo().boundingBox.extendSize.x * 2;
      });

      expect(width).toBe(4);
    });

    it('Should create a single box with a height', async () => {
      const height = await page.evaluate(() => {
        Director.createScene();
        const m = Director.Actors.Box('box', { height: 6, position: { x: 1, y: 2, z: 3 } });
        // Access the bounding box's extendSize (centered at the origin, so multiply by 2 to get the height).
        return m.getBoundingInfo().boundingBox.extendSize.y * 2;
      });

      expect(height).toBe(6);
    });

    it('Should create a single box with a depth', async () => {
      const depth = await page.evaluate(() => {
        Director.createScene();
        const m = Director.Actors.Box('box', { depth: 10, position: { x: 1, y: 2, z: 3 } });
        // Access the bounding box's extendSize (centered at the origin, so multiply by 2 to get the height).
        return m.getBoundingInfo().boundingBox.extendSize.z * 2;
      });

      expect(depth).toBe(10);
    });
  });

  afterAll(() => {
    // Remove the bundle.
    shell.exec('rm ./test/e2e/Box/core.bundle.js');
  });
});
