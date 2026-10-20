import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

describe('ActorFactory', () => {
  beforeAll(async () => {
    // Use webpack to bundle ActorFactory.js.
    execFileSync('npx', ['webpack', '--config', './test/e2e/ActorFactory/webpack.config.cjs'], { stdio: 'inherit' });

    // Start a new browser.
    await page.goto('http://localhost:3000/e2e/ActorFactory/index.html');

    // Wait for jQuery to be loaded and create a scene.
    await page.evaluate(async () => {
      await window.jQueryReady;
      window.Director.createScene();
    });
  });

  it('Should return null if the type does not exist', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('foo');
    });

    expect(mesh).toBe(null);
  });

  it('Should return a box', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('box', {});
    });

    expect(mesh).not.toBe(null);
  });

  it('Should return a sphere', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('sphere', {});
    });

    expect(mesh).not.toBe(null);
  });

  it('Should return a plane', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('plane', {});
    });

    expect(mesh).not.toBe(null);
  });

  it('Should return a photosphere', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('photosphere', { url: './ActorFactory/Office.PHOTOSPHERE.jpg' });
    });

    expect(mesh).not.toBe(null);
  });

  it('Should return an annotation', async () => {
    const mesh = await page.evaluate(() => {
      return window.ActorFactory.create('annotation', { text: 'Hello, world!' });
    });

    expect(mesh).not.toBe(null);
  });

  afterAll(() => {
    // Remove the bundle.
    rmSync('./test/e2e/ActorFactory/core.bundle.js', { force: true });
  });
});
