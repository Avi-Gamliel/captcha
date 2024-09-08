const puppeteer = require('puppeteer');
const { get_token, get_id } = require('.');
// Or import puppeteer from 'puppeteer-core';

const page_url = 'https://bestcaptchasolver.com/automation/recaptcha-v2' // sample
const access_token = "******************"
const rn = async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(page_url);

    const selector = '[data-sitekey]';
    await page.waitForSelector(selector);
  
    const value = await page.evaluate(() => {
        const element = document.querySelector('[data-sitekey]');
        return element ? element.getAttribute('data-sitekey') : null;
    });
    if (value){
        const site_key = value
        const id = await get_id(page_url, site_key, access_token)
        if (id){
            const token_response = await get_token(id, 0,access_token)
            console.log(token_response)
        }
        console.log(value)
    }
    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // await browser.close();
}

rn()
