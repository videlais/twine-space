// Description: Test for Sphere.js
import shell from 'shelljs';
import Director from '../../../src/Director.js';
import 'expect-puppeteer';

describe('Photosphere', () => {
    beforeAll(async () => {
        // Use webpack to bundle Director.js.
        shell.exec('npx webpack --config ./test/e2e/Photosphere/webpack.config.cjs');
    
        // Start a new browser.
        await page.goto('http://localhost:3000/e2e/Photosphere/index.html');
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
                return Director.Actors.Photosphere('photosphere', './Photosphere/Office.PHOTOSPHERE.jpg');
            });
        
            expect(mesh).toBe(null);
        });
    
        it('Should create a single photosphere with default values', async () => {
            const meshCount = await page.evaluate(async () => {
                Director.createScene();
                await Director.Actors.Photosphere('photosphere', './Photosphere/Office.PHOTOSPHERE.jpg');
                return Director.scene.meshes.length;
            });
        
            expect(meshCount).toBe(2);
        });
    
        it('Should create a single photosphere with custom values', async () => {
            const meshCount = await page.evaluate(async () => {
                Director.createScene();
                await Director.Actors.Photosphere('photosphere', './Photosphere/Office.PHOTOSPHERE.jpg', { size: 1000 });
                return Director.scene.meshes.length;
            });
        
            expect(meshCount).toBe(2);
        });

        it('Should return null if url value does not exist', async () => {
            const mesh = await page.evaluate(async () => {
                Director.createScene();
                return await Director.Actors.Photosphere('photosphere', 0);
            });
        
            expect(mesh).toBe(null);
        });
    });
});