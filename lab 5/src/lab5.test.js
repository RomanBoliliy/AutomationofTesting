const { Builder, By, Key, until } = require('selenium-webdriver');

// Налаштування WebDriver
let driver;
beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
}, 10000);

afterAll(async () => {
    await driver.quit();
}, 10000);

describe('Wikipedia Tests', () => {
    test('Перевірка наявності основних елементів', async () => {
        await driver.get('https://www.wikipedia.org');
        
        const searchBox = await driver.findElement(By.id('searchInput'));
        const logo = await driver.findElement(By.css('img.central-featured-logo'));
        
        expect(await searchBox.isDisplayed()).toBe(true);
        expect(await logo.isDisplayed()).toBe(true);
    }, 15000);

    test('Введення тексту та пошук', async () => {
        await driver.get('https://www.wikipedia.org');
        
        const searchBox = await driver.findElement(By.id('searchInput'));
        await searchBox.sendKeys('Selenium', Key.RETURN);
        
        await driver.wait(until.titleContains('Selenium'), 10000);
        
        const title = await driver.getTitle();
          expect(title).toContain('Selenium');
    }, 15000);

    test('Перевірка локаторів на сторінці статті', async () => {
        await driver.get('https://en.wikipedia.org/wiki/Selenium');
        
        const titleElement = await driver.findElement(By.xpath('//h1'));
        const navigationLinks = await driver.findElements(By.css('#mw-panel a'));
        const searchForm = await driver.findElement(By.id('searchform'));
        
        expect(await titleElement.getText()).toBe('Selenium');
        expect(navigationLinks.length).toBeGreaterThan(0);
        expect(await searchForm.isDisplayed()).toBe(true);
    }, 15000);

    test('Перевірка переходу за посиланням і зміни URL', async () => {
        await driver.get('https://en.wikipedia.org/wiki/Selenium');
        
        const firstLink = await driver.findElement(By.css('#mw-content-text a'));
        const linkHref = await firstLink.getAttribute('href');
        
        await firstLink.click();
        await driver.wait(until.urlContains(linkHref), 10000);
        
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).toContain(linkHref);
    }, 15000);

    test('Перевірка CSS-властивостей', async () => {
        await driver.get('https://en.wikipedia.org/wiki/Selenium');
        
        const heading = await driver.findElement(By.xpath('//h1'));
        const fontSize = await heading.getCssValue('font-size');
        
        expect(fontSize).toBe('2em'); // Очікуване значення може змінюватися
    }, 15000);
});

