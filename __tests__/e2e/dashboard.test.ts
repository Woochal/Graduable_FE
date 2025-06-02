import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { bypassLogin } from './helpers/auth.helper';

describe('Dashboard Tests', () => {
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
        // 로그인 우회
        await bypassLogin(driver);
    });

    test('Should display dashboard components', async () => {
        // 대시보드의 주요 컴포넌트들이 표시되는지 확인
        const components = [
            '[data-testid="progress-summary"]',
            '[data-testid="recent-courses"]',
            '[data-testid="upcoming-deadlines"]',
            '[data-testid="grade-distribution"]',
        ];

        for (const selector of components) {
            const element = await driver.findElement(By.css(selector));
            expect(await element.isDisplayed()).toBeTruthy();
        }
    });

    test('Should show correct user information', async () => {
        const userInfo = await driver.findElement(By.css('[data-testid="user-info"]'));
        expect(await userInfo.isDisplayed()).toBeTruthy();

        // 사용자 정보가 올바르게 표시되는지 확인
        const userName = await driver.findElement(By.css('[data-testid="user-name"]'));
        const userSemester = await driver.findElement(By.css('[data-testid="user-semester"]'));

        expect(await userName.isDisplayed()).toBeTruthy();
        expect(await userSemester.isDisplayed()).toBeTruthy();
    });

    test('Should navigate to other pages from dashboard', async () => {
        // 대시보드에서 다른 페이지로의 네비게이션 테스트
        const navigationLinks = [
            { selector: '[data-testid="roadmap-link"]', expectedUrl: '/roadmap' },
            { selector: '[data-testid="course-history-link"]', expectedUrl: '/course-history' },
            { selector: '[data-testid="simulator-link"]', expectedUrl: '/simulator' },
        ];

        for (const { selector, expectedUrl } of navigationLinks) {
            const link = await driver.findElement(By.css(selector));
            await link.click();

            await driver.wait(until.urlContains(expectedUrl), 5000);
            expect(await driver.getCurrentUrl()).toContain(expectedUrl);

            // 대시보드로 돌아가기
            await driver.get('http://localhost:5173/dashboard');
            await driver.wait(until.urlContains('/dashboard'), 5000);
        }
    });
});
