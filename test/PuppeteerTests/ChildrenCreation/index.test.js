/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
const TestServer = require('../../utils/TestServer');
require('expect-puppeteer');

const testServer = new TestServer(8082);
      
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
       
describe('Puppeteer Tests - Entity Generation', () => {
    beforeAll(async () => {
        // Generate the CDN-based test format first
        ShellJS.exec('node build-format-test-cdn.js');

        // Convert .twee to .html
        ShellJS.exec(`npx extwee -c -s docs/dist/aframe-format-test-cdn.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);

        // Start the HTTP server
        await testServer.start();
    });
     
    afterAll(async () => {
        // Stop the HTTP server
        await testServer.stop();
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
      
    it('Should create <a-entity> > <a-text> elements', async () => {
        // Wait for A-Frame to load and story to process
        await page.waitForFunction(() => {
            return typeof window.AFRAME !== 'undefined' && 
                   typeof window.story !== 'undefined' &&
                   document.querySelector('a-entity > a-text') !== null;
        }, { timeout: 15000 });
        
        let elementExists = false;
        elementExists = await page.evaluate(() => {
            return document.querySelector("a-entity > a-text") !== null;
        });
        await expect(elementExists).toBe(true);
    }, 20000);
});