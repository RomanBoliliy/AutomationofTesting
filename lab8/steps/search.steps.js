const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
let page, browser;

Given('I open the Automation Exercise website', async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
});

When('I search for {string}', async (query) => {
  await page.type('#search_product', query);
  await page.click('#submit_search');
});

Then('I should see results related to {string}', async (query) => {
  await page.waitForFunction(
    q => !!Array.from(document.querySelectorAll('.productinfo')).find(el => el.textContent.includes(q)),
    {},
    query
  );
  await browser.close();
});