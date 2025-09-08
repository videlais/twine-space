/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
const TestServer = require('../../utils/TestServer');
require('expect-puppeteer');

const testServer = new TestServer(8084);
   
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
    
describe('Puppeteer Tests - Passage Navigation', () => {
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
   
    it('Should display "Some text."', async () => {
        // Wait for the link to be available
        await page.waitForSelector('[data-passage="Another"]', { timeout: 10000 });
        
        await page.click('[data-passage="Another"]');
        
        // Wait for navigation to complete
        await page.waitForFunction(() => {
            return document.body.textContent.includes('Some text.');
        }, { timeout: 5000 });
        
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Some text.');
    }, 20000);
});