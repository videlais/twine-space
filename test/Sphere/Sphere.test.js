// Description: Test for Box.js
import shell from 'shelljs';
import Director from '../../src/Director.js';
import "expect-puppeteer";

describe('Sphere', () => {
    beforeAll(async () => {
        // Use webpack to bundle Director.js.
        shell.exec('npx webpack --config ./test/Sphere/webpack.config.cjs');
        
        // Start a new browser.
        await page.goto(`http://localhost:3000/Sphere/index.html`);
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
                Director.Actors.Sphere('sphere');
                return Director.scene;
            });
        
            expect(scene).toBe(null);
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
                Director.Actors.Sphere('sphere', {x: 1, y: 2, z: 3}, {diameter: 4});
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
});
