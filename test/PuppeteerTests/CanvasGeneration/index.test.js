/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
require('expect-puppeteer');
    
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
     
describe('Puppeteer Tests - Canvas Generation', () => {
    beforeAll(async () => {
        await page.goto(`file://${path.join(__dirname, 'index.html')}`);
    });
   
    afterAll(async () => {
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
    
    it('Should create <canvas> element', async () => {
        let elementExists = false;
        elementExists = await page.evaluate(() => {
            let result = false;
            if(document.querySelector("canvas") !== null) {
                result = true;
            }
            return result;
          })
        await expect(elementExists).toBe(true);
    });
});