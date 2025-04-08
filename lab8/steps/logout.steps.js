const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
let page, browser;

Given('I am logged in', async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
  await page.click('a[href="/login"]');
  await page.type('[data-qa="login-email"]', 'testuser123@example.com');
  await page.type('[data-qa="login-password"]', '123456');
  await page.click('[data-qa="login-button"]');
  await page.waitForSelector('a:has-text("Logout")');
});

When('I click on {string}', async (linkText) => {
  await page.evaluate((text) => {
    const link = Array.from(document.querySelectorAll('a')).find(el => el.textContent.trim() === text);
    if (link) link.click();
  }, linkText);
});

Then('I should see the message {string}', async (message) => {
  await page.waitForFunction(
    text => !!Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes(text)),
    {},
    message
  );
  await browser.close();
});