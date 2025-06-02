import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { bypassLogin } from './helpers/auth.helper';

describe('Simulator Tests', () => {
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
        // 시뮬레이터 페이지로 이동
        await driver.get('http://localhost:5173/simulator');
        await driver.wait(until.urlContains('/simulator'), 5000);
    });

    test('Should display simulator components', async () => {
        // 시뮬레이터의 주요 컴포넌트들이 표시되는지 확인
        const components = [
            '[data-testid="course-search"]',
            '[data-testid="semester-selector"]',
            '[data-testid="simulation-results"]',
        ];

        for (const selector of components) {
            const element = await driver.findElement(By.css(selector));
            expect(await element.isDisplayed()).toBeTruthy();
        }
    });

    test('Should search and add courses', async () => {
        // 과목 검색
        const searchInput = await driver.findElement(By.css('[data-testid="course-search-input"]'));
        await searchInput.sendKeys('프로그래밍');

        // 검색 결과 확인
        const searchResults = await driver.findElements(By.css('[data-testid="search-result-item"]'));
        expect(searchResults.length).toBeGreaterThan(0);

        // 첫 번째 결과 선택
        await searchResults[0].click();

        // 선택된 과목이 시뮬레이션에 추가되었는지 확인
        const selectedCourses = await driver.findElements(By.css('[data-testid="selected-course"]'));
        expect(selectedCourses.length).toBeGreaterThan(0);
    });

    test('Should simulate graduation requirements', async () => {
        // 시뮬레이션 실행 버튼 클릭
        const simulateButton = await driver.findElement(By.css('[data-testid="simulate-button"]'));
        await simulateButton.click();

        // 시뮬레이션 결과 확인
        const results = await driver.findElement(By.css('[data-testid="simulation-results"]'));
        expect(await results.isDisplayed()).toBeTruthy();

        // 결과 항목들 확인
        const resultItems = [
            '[data-testid="total-credits"]',
            '[data-testid="major-credits"]',
            '[data-testid="general-credits"]',
        ];

        for (const selector of resultItems) {
            const element = await driver.findElement(By.css(selector));
            expect(await element.isDisplayed()).toBeTruthy();
        }
    });

    test('Should save and load simulation scenarios', async () => {
        // 시나리오 저장
        const saveButton = await driver.findElement(By.css('[data-testid="save-scenario"]'));
        await saveButton.click();

        // 저장 확인 메시지
        const saveMessage = await driver.findElement(By.css('[data-testid="save-message"]'));
        expect(await saveMessage.isDisplayed()).toBeTruthy();

        // 저장된 시나리오 목록 확인
        const scenarioList = await driver.findElement(By.css('[data-testid="scenario-list"]'));
        expect(await scenarioList.isDisplayed()).toBeTruthy();

        // 첫 번째 시나리오 로드
        const firstScenario = await driver.findElement(By.css('[data-testid="scenario-item"]'));
        await firstScenario.click();

        // 로드된 시나리오 확인
        const loadedCourses = await driver.findElements(By.css('[data-testid="selected-course"]'));
        expect(loadedCourses.length).toBeGreaterThan(0);
    });
});
