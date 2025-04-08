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

When('I login with email {string} and password {string}', async (email, password) => {
  await page.type('[data-qa="login-email"]', email);
  await page.type('[data-qa="login-password"]', password);
  await page.click('[data-qa="login-button"]');
});

Then('I should see the message {string}', async (text) => {
  await page.waitForFunction(
    message => !!Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes(message)),
    {},
    text
  );
  await browser.close();
});