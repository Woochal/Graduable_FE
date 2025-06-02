import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { bypassLogin } from './helpers/auth.helper';

describe('Roadmap Tests', () => {
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
        // 로드맵 페이지로 이동
        await driver.get('http://localhost:5173/roadmap');
        await driver.wait(until.urlContains('/roadmap'), 5000);
    });

    test('Should display roadmap components', async () => {
        // 로드맵의 주요 컴포넌트들이 표시되는지 확인
        const components = [
            '[data-testid="semester-timeline"]',
            '[data-testid="course-list"]',
            '[data-testid="requirement-summary"]',
        ];

        for (const selector of components) {
            const element = await driver.findElement(By.css(selector));
            expect(await element.isDisplayed()).toBeTruthy();
        }
    });

    test('Should show course details on click', async () => {
        // 첫 번째 과목 클릭
        const firstCourse = await driver.findElement(By.css('[data-testid="course-item"]'));
        await firstCourse.click();

        // 과목 상세 정보가 표시되는지 확인
        const courseDetails = await driver.findElement(By.css('[data-testid="course-details"]'));
        expect(await courseDetails.isDisplayed()).toBeTruthy();

        // 상세 정보의 필수 요소들 확인
        const details = [
            '[data-testid="course-name"]',
            '[data-testid="course-credits"]',
            '[data-testid="course-prerequisites"]',
        ];

        for (const selector of details) {
            const element = await driver.findElement(By.css(selector));
            expect(await element.isDisplayed()).toBeTruthy();
        }
    });

    test('Should filter courses by semester', async () => {
        // 학기 필터 선택
        const semesterFilter = await driver.findElement(By.css('[data-testid="semester-filter"]'));
        await semesterFilter.click();

        // 첫 번째 학기 선택
        const firstSemester = await driver.findElement(By.css('[data-testid="semester-option"]'));
        await firstSemester.click();

        // 필터링된 과목 목록 확인
        const filteredCourses = await driver.findElements(By.css('[data-testid="course-item"]'));
        expect(filteredCourses.length).toBeGreaterThan(0);
    });

    test('Should show requirement progress', async () => {
        // 졸업 요건 진행 상황 확인
        const requirementProgress = await driver.findElement(By.css('[data-testid="requirement-progress"]'));
        expect(await requirementProgress.isDisplayed()).toBeTruthy();

        // 각 요건별 진행률 확인
        const progressItems = await driver.findElements(By.css('[data-testid="progress-item"]'));
        expect(progressItems.length).toBeGreaterThan(0);

        for (const item of progressItems) {
            const progressBar = await item.findElement(By.css('[data-testid="progress-bar"]'));
            expect(await progressBar.isDisplayed()).toBeTruthy();
        }
    });
});
