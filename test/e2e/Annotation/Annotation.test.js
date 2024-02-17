// Description: Test for Annotation.js
import shell from 'shelljs';
import Director from '../../../src/Director.js';
import 'expect-puppeteer';

describe('Annotation', () => {
    beforeAll(async () => {
        // Use webpack to bundle Director.js.
        shell.exec('npx webpack --config ./test/e2e/Annotation/webpack.config.cjs');
    
        // Start a new browser.
        await page.goto('http://localhost:3000/e2e/Annotation/index.html');
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
                return Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.'});
            });
        
            expect(mesh).toBe(null);
        });
    
        it('Should create a single annotation with default values', async () => {
            const meshCount = await page.evaluate(() => {
                Director.createScene();
                Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.'});
                return Director.scene.meshes.length;
            });
        
            expect(meshCount).toBe(1);
        });
    
        it('Should create a single annotation with custom values', async () => {
            const meshCount = await page.evaluate(() => {
                Director.createScene();
                Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.', position: {x: 1, y: 1, z: 1}});
                return Director.scene.meshes.length;
            });
        
            expect(meshCount).toBe(1);
        });
    
        it('Should create multiple annotations', async () => {
            const meshCount = await page.evaluate(() => {
                Director.createScene();
                Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.', position: {x: 1, y: 1, z: 1}});
                Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.', position: {x: 1, y: 1, z: 1}});
                Director.Actors.Annotation({title: 'annotation', text: 'This is a test annotation.', position: {x: 1, y: 1, z: 1}});
                return Director.scene.meshes.length;
            });
        
            expect(meshCount).toBe(3);
        });
    });
});