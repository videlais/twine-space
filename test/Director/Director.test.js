// Description: Test for Director.js
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import shell from 'shelljs';
import Director from '../../src/Director';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Director', () => {
  beforeAll(async () => {
    // Use webpack to bundle Director.js.
    shell.exec('npx webpack --config ./test/Director/webpack.config.cjs');
    
    // Start a new browser.
    await page.goto(`file://${join(__dirname, 'index.html')}`);
  });

  describe('constructor', () => {
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
  
      const mesh = await page.evaluate(() => {
        return Director.mesh;
      });
  
      expect(scene).toBe(null);
      expect(engine).toBe(null);
      expect(canvas).toBe(null);
      expect(mesh).toBe(null);
    });
  });

  describe('createScene', () => {
    it('Should create a scene', async () => {
      const scene = await page.evaluate(() => {
        Director.createScene();
        return Director.scene;
      });
  
      expect(scene).not.toBe(null);
    });
  
    it('Should create an engine', async () => {
      const engine = await page.evaluate(() => {
        Director.createScene();
        return Director.engine;
      });
  
      expect(engine).not.toBe(null);
    });
  
    it('Should create a canvas', async () => {
      const canvas = await page.evaluate(() => {
        Director.createScene();
        return Director.canvas;
      });
  
      expect(canvas).not.toBe(null);
    });
  
    it('Should hide the tw-passage element', async () => {
      const passage = await page.evaluate(() => {
        Director.createScene();
        return $('tw-passage').css('display');
      });
  
      expect(passage).toBe('none');
    });
  
    it('Should create canvas element', async () => {
      const canvas = await page.evaluate(() => {
        Director.createScene();
        return $('#renderCanvas').length;
      });
  
      expect(canvas).toBe(1);
    });
  
    it('Should show renderCanvas element', async () => {
      const canvas = await page.evaluate(() => {
        Director.createScene();
        return $('#renderCanvas').css('display');
      });
  
      expect(canvas).toBe('inline');
    });

    it('Should hide the tw-passage element and show the renderCanvas element if scene already exists', async () => {
      const canvas = await page.evaluate(() => {
        Director.createScene();
        Director.createScene();
        return $('tw-passage').css('display') + $('#renderCanvas').css('display');
      });
  
      expect(canvas).toBe('noneinline');
    });

    it('Should create a camera', async () => {
      const camera = await page.evaluate(() => {
        Director.createScene();
        return Director.scene.activeCamera.name;
      });
  
      expect(camera).toBe('DevOr_camera');
    });

    it('Setup pointer down (click) events', async () => {
      const pointerDown = await page.evaluate(() => {
        Director.createScene();
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
});
