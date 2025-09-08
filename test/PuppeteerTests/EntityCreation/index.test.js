/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
const TestServer = require('../../utils/TestServer');
require('expect-puppeteer');

const testServer = new TestServer(8080);
     
ShellJS.exec(`extwee -c -s docs/dist/aframe-format-test-inline.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
      
describe('Puppeteer Tests - Entity Generation', () => {
    beforeAll(async () => {
        // Generate the CDN-based test format first
        ShellJS.exec('node build-format-test-cdn.js');

        // Convert .twee to .html
        ShellJS.exec(`npx extwee -c -s docs/dist/aframe-format-test-cdn.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);

        // Start the HTTP server
        await testServer.start();
        
        // Listen for console messages and errors
        page.on('console', msg => {
            console.log('Browser console:', msg.type(), msg.text());
        });
        
        page.on('pageerror', error => {
            console.log('Page error:', error.message);
        });
        
        // Navigate to the test file via HTTP
        const testPath = path.relative(process.cwd(), path.join(__dirname, 'index.html'));
        await page.goto(`http://localhost:8080/${testPath}`);
        
        // Wait for the page to load
        await page.waitForFunction(() => document.readyState === 'complete');
    });
    
    afterAll(async () => {
        // Stop the HTTP server
        await testServer.stop();
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
    
    afterAll(async () => {
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
     
    it('Should create <a-text> element', async () => {
        console.log('Starting test...');
        
        // Wait for the story to load
        try {
            await page.waitForFunction(() => {
                return typeof window.story !== 'undefined' && window.story !== null;
            }, { timeout: 15000 });
        } catch (error) {
            // If that fails, let's debug what's actually available
            const debugInfo = await page.evaluate(() => {
                return {
                    hasWindow: typeof window !== 'undefined',
                    hasStory: typeof window.story !== 'undefined',
                    story: window.story,
                    hasAFrame: typeof window.AFRAME !== 'undefined',
                    hasDollar: typeof window.$ !== 'undefined',
                    scripts: Array.from(document.scripts).map(s => ({ src: s.src, content: s.innerHTML.substring(0, 100) })),
                    errors: window.errors || []
                };
            });
            console.log('Debug info:', JSON.stringify(debugInfo, null, 2));
            throw error;
        }
        
        console.log('Story loaded, waiting for A-Frame...');
        
        // Wait for A-Frame to load
        await page.waitForFunction(() => {
            return typeof window.AFRAME !== 'undefined';
        }, { timeout: 15000 });
        
        console.log('A-Frame loaded, waiting for elements to be created...');
        
        // Wait for elements to be processed and created
        await page.waitForFunction(() => {
            return document.querySelector('a-text') !== null;
        }, { timeout: 10000 });
        
        // Verify the element exists
        const elementExists = await page.evaluate(() => {
            const textEl = document.querySelector('a-text');
            console.log('Found a-text element:', textEl);
            if (textEl) {
                console.log('Element attributes:', textEl.outerHTML);
            }
            return textEl !== null;
        });
        
        console.log('Test result: a-text exists =', elementExists);
        await expect(elementExists).toBe(true);
    }, 30000);
});