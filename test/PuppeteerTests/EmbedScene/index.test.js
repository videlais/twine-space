/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
const TestServer = require('../../utils/TestServer');
require('expect-puppeteer');

const testServer = new TestServer(8083);
     
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
      
describe('Puppeteer Tests - Scene Embedding', () => {
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
     
    it('Should embed a whole scene from another passage', async () => {
        // Wait for A-Frame and story to load, then for the specific element
        await page.waitForFunction(() => {
            return typeof window.AFRAME !== 'undefined' && 
                   typeof window.story !== 'undefined';
        }, { timeout: 15000 });
        
        await page.waitForSelector('a-box', { timeout: 15000 });
        await expect(true).toBe(true);
    }, 25000);
});