import shell from 'shelljs';
import Director from '../../src/Director.js';
import 'expect-puppeteer';

describe('Director', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/Director/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/Director/index.html');
  });

  describe('Initial static state', () => {
    it('Initial values should be null', async () => {
      const scene = await page.evaluate(() => {
        return Director.scene;
      });

      const engine = await page.evaluate(() => {
        return Director.engine;
      });

      const canvas = await page.evaluate(() => {
        return Director.canvas;
      });

      expect(scene).toBe(null);
      expect(engine).toBe(null);
      expect(canvas).toBe(null);
    });
  });

  describe('createScene', () => {
    beforeAll(async () => {
      await page.evaluate(() => {
        // Reset all static values.
        Director.scene = null;
        Director.engine = null;
        Director.canvas = null;

        // Create a new scene.
        Director.createScene();
      });
    });

    it('Should create a scene', async () => {
      const scene = await page.evaluate(() => {
        return Director.scene;
      });

      expect(scene).not.toBe(null);
    });

    it('Should create an engine', async () => {
      const engine = await page.evaluate(() => {
        return Director.engine;
      });

      expect(engine).not.toBe(null);
    });

    it('Should create a canvas', async () => {
      const canvas = await page.evaluate(() => {
        return Director.canvas;
      });

      expect(canvas).not.toBe(null);
    });

    it('Should hide the tw-passage element', async () => {
      const passage = await page.evaluate(() => {
        return $('tw-passage').css('display');
      });

      expect(passage).toBe('none');
    });

    it('Should create canvas element', async () => {
      const canvas = await page.evaluate(() => {
        return $('#renderCanvas').length;
      });

      expect(canvas).toBe(1);
    });

    it('Should show renderCanvas element', async () => {
      const canvas = await page.evaluate(() => {
        return $('#renderCanvas').css('display');
      });

      expect(canvas).toBe('inline');
    });

    it('Should create a camera', async () => {
      const camera = await page.evaluate(() => {
        return Director.scene.activeCamera.name;
      });

      expect(camera).toBe('DevOr_camera');
    });

    it('Setup pointer down (click) events', async () => {
      const pointerDown = await page.evaluate(() => {
        return typeof Director.scene.onPointerDown;
      });

      expect(pointerDown).toBe('function');
    });
  });

  describe('clearScene', () => {
    it('Should clear the scene of all meshes', async () => {
      const length = await page.evaluate(() => {
        Director.createScene();
        Director.clearScene();
        return Director.scene.meshes.length;
      });

      expect(length).toBe(0);
    });

    it('Should hide the renderCanvas element', async () => {
      const canvas = await page.evaluate(() => {
        Director.createScene();
        Director.clearScene();
        return $('#renderCanvas').css('display');
      });

      expect(canvas).toBe('none');
    });

    it('Should show the tw-passage element', async () => {
      const passage = await page.evaluate(() => {
        Director.createScene();
        Director.clearScene();
        return $('tw-passage').css('display');
      });

      expect(passage).toBe('inline');
    });
  });

  describe('isReady', () => {
    beforeEach(async () => {
      await page.evaluate(() => {
        // Before each test, reset all static values.
        Director.scene = null;
        Director.engine = null;
        Director.canvas = null;
      });
    });

    it('Should return false if the scene is not ready or null', async () => {
      const ready = await page.evaluate(() => {
        return Director.isReady();
      });

      expect(ready).toBe(false);
    });

    it('Should return true if the scene is ready', async () => {
      const ready = await page.evaluate(() => {
        Director.createScene();
        return Director.isReady();
      });

      expect(ready).toBe(true);
    });
  });
});
