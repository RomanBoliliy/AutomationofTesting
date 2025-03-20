const { Builder, By, until } = require('selenium-webdriver');

describe('AutomationExercise Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Перевірка головної сторінки', async () => {
        await driver.get('https://automationexercise.com/');

        let navMenu = await driver.findElement(By.css('nav'));
        expect(navMenu).toBeDefined();

        let logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'));
        expect(logo).toBeDefined();

        let loginButton = await driver.findElement(By.linkText('Signup / Login'));
        expect(loginButton).toBeDefined();
    });

    test('Перевірка реєстрації користувача', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Signup / Login')).click();
        
        await driver.wait(until.elementLocated(By.name('name')), 5000).sendKeys('Test User');
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.css('button[data-qa="signup-button"]')).click();
        
        let successMessage = await driver.findElement(By.css('.alert-success'));
        expect(successMessage).toBeDefined();
    });
});