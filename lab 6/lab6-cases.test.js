const { Builder, By, until } = require('selenium-webdriver');

describe('AutomationExercise Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Сценарій 1: Перевірка головної сторінки', async () => {
        await driver.get('https://automationexercise.com/');
        let logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'));
        expect(logo).toBeDefined();
    });

    test('Сценарій 2: Перевірка сторінки "Products"', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Products')).click();
        let productsPage = await driver.findElement(By.css('.title.text-center'));
        expect(productsPage).toBeDefined();
    });

    test('Сценарій 3: Додавання товару в кошик', async () => {
        await driver.get('https://automationexercise.com/products');
        await driver.findElement(By.css('.productinfo .btn.btn-default')).click();
        let cartSuccessMessage = await driver.findElement(By.css('.modal-content'));
        expect(cartSuccessMessage).toBeDefined();
    });

    test('Сценарій 4: Перевірка сторінки "Contact Us"', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Contact us')).click();
        let contactPage = await driver.findElement(By.css('h2.title.text-center'));
        expect(contactPage).toBeDefined();
    });

    test('Сценарій 5: Реєстрація нового користувача', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Signup / Login')).click();
        await driver.wait(until.elementLocated(By.name('name')), 5000).sendKeys('Test User');
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.css('button[data-qa="signup-button"]')).click();
        let successMessage = await driver.findElement(By.css('.alert-success'));
        expect(successMessage).toBeDefined();
    });

    test('Сценарій 6: Логін з існуючим акаунтом', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Signup / Login')).click();
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();
        let logoutButton = await driver.findElement(By.linkText('Logout'));
        expect(logoutButton).toBeDefined();
    });


    test('Сценарій 7: Видалення акаунту', async () => {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.linkText('Signup / Login')).click();
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();
        await driver.findElement(By.linkText('Delete Account')).click();
        let confirmationMessage = await driver.findElement(By.css('.alert-success'));
        expect(confirmationMessage).toBeDefined();
    });



    test('Сценарій 8: Перевірка функції пошуку товарів', async () => {
        await driver.get('https://automationexercise.com/products');
        let searchBox = await driver.findElement(By.id('search_product'));
        await searchBox.sendKeys('dress');
        await driver.findElement(By.id('submit_search')).click();
        let searchResult = await driver.findElement(By.css('.features_items'));
        expect(searchResult).toBeDefined();
    });

    test('Сценарій 9: Оформлення замовлення як гість', async () => {
        await driver.get('https://automationexercise.com/products');
        await driver.findElement(By.css('.productinfo .btn.btn-default')).click();
        await driver.findElement(By.css('a[href="/view_cart"]')).click();
        await driver.findElement(By.linkText('Proceed To Checkout')).click();
        let checkoutPage = await driver.findElement(By.css('.checkout-page'));
        expect(checkoutPage).toBeDefined();
    });

    test('Сценарій 10: Додавання товару до списку бажань', async () => {
        await driver.get('https://automationexercise.com/products');
        await driver.findElement(By.css('.productinfo .btn.btn-default')).click();
        let wishlistButton = await driver.findElement(By.css('.wishlist')); 
        expect(wishlistButton).toBeDefined();
    });





    
});
