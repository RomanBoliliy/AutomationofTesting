const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
let page, browser;

Given('I open the Automation Exercise website', async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
});

When('I click on {string}', async (linkText) => {
  await page.evaluate((text) => {
    const link = Array.from(document.querySelectorAll('a')).find(el => el.textContent.trim() === text);
    if (link) link.click();
  }, linkText);
});

When('I fill the signup form with valid credentials', async () => {
  await page.type('[data-qa="signup-name"]', 'TestUser');
  await page.type('[data-qa="signup-email"]', 'testuser123@example.com');
});

When('I click {string}', async (btnText) => {
  await page.evaluate((text) => {
    const button = Array.from(document.querySelectorAll('button')).find(el => el.textContent.trim() === text);
    if (button) button.click();
  }, btnText);
});

Then('I should see the message {string}', async (message) => {
  await page.waitForFunction(
    text => !!Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes(text)),
    {},
    message
  );
  await browser.close();
});