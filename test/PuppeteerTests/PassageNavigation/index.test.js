/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
require('expect-puppeteer');
   
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
    
describe('Puppeteer Tests - Passage Navigation', () => {
    beforeAll(async () => {
        await page.goto(`file://${path.join(__dirname, 'index.html')}`);
    });
  
    afterAll(async () => {
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
   
    it('Should display "Some text."', async () => {
        await page.click('[data-passage="Another"');
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Some text.');
    });
});