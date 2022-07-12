/**
 * @jest-environment puppeteer
 */
const ShellJS = require('shelljs');
const path = require('path');
require('expect-puppeteer');
      
ShellJS.exec(`extwee -c -s docs/dist/aframe-format.js -i ${path.join(__dirname, 'index.twee')} -o ${path.join(__dirname, 'index.html')}`);
       
describe('Puppeteer Tests - Entity Generation', () => {
    beforeAll(async () => {
        await page.goto(`file://${path.join(__dirname, 'index.html')}`);
    });
     
    afterAll(async () => {
        ShellJS.rm(`${path.join(__dirname, 'index.html')}`);
    });
      
    it('Should create <a-entity> > <a-text> elements', async () => {
        let elementExists = false;
        elementExists = await page.evaluate(() => {
            return document.querySelector("a-entity > a-text") !== null;
        })
        await expect(elementExists).toBe(true);
     });
 });