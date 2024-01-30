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
