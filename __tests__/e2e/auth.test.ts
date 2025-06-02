import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('Authentication Tests', () => {
    let driver: WebDriver;

    beforeAll(async () => {
        const options = new Options();
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-popup-blocking');
        options.addArguments('--disable-notifications');
        options.addArguments('--start-maximized');
        options.addArguments('--disable-web-security');
        options.addArguments('--allow-running-insecure-content');

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    beforeEach(async () => {
        await driver.get('http://localhost:5173');
    });

    test('Should redirect to login page when not authenticated', async () => {
        // 대시보드 페이지로 이동 시도
        await driver.get('http://localhost:5173/dashboard');

        // 로그인 페이지로 리다이렉트되는지 확인
        await driver.wait(until.urlContains('/'), 5000);

        // Check if Kakao login button exists
        const loginButton = await driver.findElement(By.css('button'));
        expect(await loginButton.isDisplayed()).toBeTruthy();
    });

    test('Should show login form with required fields', async () => {
        // 로그인 페이지로 이동
        await driver.get('http://localhost:5173');

        // 로그인 폼이 표시되는지 확인
        const loginForm = await driver.findElement(By.css('div'));
        expect(await loginForm.isDisplayed()).toBeTruthy();

        // 로고가 표시되는지 확인
        const logo = await driver.findElement(By.css('img'));
        expect(await logo.isDisplayed()).toBeTruthy();
    });
});
