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

When('I fill the contact form', async () => {
  await page.waitForSelector('input[name="name"]');
  await page.type('input[name="name"]', 'Test User');
  await page.type('input[name="email"]', 'testuser123@example.com');
  await page.type('input[name="subject"]', 'Test Subject');
  await page.type('textarea[name="message"]', 'Test message body');
});

When('I click {string}', async (btnText) => {
  await page.evaluate((text) => {
    const button = Array.from(document.querySelectorAll('input[type="submit"], button')).find(el => el.value === text || el.textContent.trim() === text);
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