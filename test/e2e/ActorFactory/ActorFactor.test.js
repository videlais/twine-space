import shell from 'shelljs';

describe('ActorFactory', () => {
  beforeAll(async () => {
    // Use webpack to bundle ActorFactory.js.
    shell.exec('npx webpack --config ./test/e2e/ActorFactory/webpack.config.cjs');

    // Start a new browser.
    await page.goto('http://localhost:3000/e2e/ActorFactory/index.html');

    // Wait for the window to be created.
    // Create a scene.
    await page.evaluate(() => {
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
    shell.exec('rm ./test/e2e/ActorFactory/core.bundle.js');
  });
});
