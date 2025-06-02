import { WebDriver, By, until } from 'selenium-webdriver';

// 테스트용 가짜 사용자 데이터
const mockUserData = {
    googleId: 'test123',
    email: 'test@example.com',
    name: 'Test User',
    userSemester: '2024-1',
};

// 로그인 우회 함수
export async function bypassLogin(driver: WebDriver) {
    // 먼저 메인 페이지로 이동
    await driver.get('http://localhost:5173/');

    // Electron API 모킹
    await driver.executeScript(`
        window.electronAPI = {
            getStoreValue: async (key) => {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
            },
            setStoreValue: async (key, value) => {
                localStorage.setItem(key, JSON.stringify(value));
            },
            removeStoreValue: async (key) => {
                localStorage.removeItem(key);
            }
        };
    `);

    // 로컬 스토리지에 테스트용 사용자 데이터 저장
    await driver.executeScript(`
        const mockData = ${JSON.stringify(mockUserData)};
        localStorage.setItem('user', JSON.stringify(mockData));
        localStorage.setItem('userInfo', JSON.stringify(mockData));
        localStorage.setItem('userInfo_' + mockData.googleId, JSON.stringify(mockData));
    `);

    // 페이지 새로고침
    await driver.navigate().refresh();

    // React Router의 라우팅을 직접 트리거
    await driver.executeScript(`
        // React Router의 history 객체를 찾아서 직접 navigate 호출
        const router = window.__REACT_ROUTER_DOM__;
        if (router && router.navigate) {
            router.navigate('/dashboard');
        } else {
            // fallback: 직접 URL 변경
            window.location.href = '/dashboard';
        }
    `);

    // 대시보드 페이지 로드 대기
    await driver.wait(until.urlContains('/dashboard'), 10000);

    // 페이지가 완전히 로드될 때까지 추가 대기
    await driver.wait(until.elementLocated(By.css('body')), 10000);
}

export async function login(driver: WebDriver) {
    // 로그인 페이지로 이동
    await driver.get('http://localhost:5173');

    // 카카오 로그인 버튼 클릭
    const kakaoLoginButton = await driver.findElement(By.css('button'));
    await kakaoLoginButton.click();

    // 팝업 창이 열릴 때까지 대기 (30초)
    await driver.wait(async () => {
        const handles = await driver.getAllWindowHandles();
        return handles.length > 1;
    }, 30000);

    // 모든 창 핸들 가져오기
    const handles = await driver.getAllWindowHandles();
    console.log('Window handles:', handles);

    // 팝업 창으로 전환
    await driver.switchTo().window(handles[1]);
    console.log('Switched to popup window');

    // 카카오 로그인 페이지가 로드될 때까지 대기 (30초)
    await driver.wait(until.urlContains('kakao.com'), 30000);
    console.log('Kakao login page loaded');

    // 테스트용 계정 정보 입력
    try {
        const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 30000);
        await emailInput.clear();
        await emailInput.sendKeys(process.env.TEST_KAKAO_EMAIL || 'test@example.com');
        console.log('Email entered');

        const nextButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 30000);
        await nextButton.click();
        console.log('Next button clicked');

        // 비밀번호 입력
        const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 30000);
        await passwordInput.clear();
        await passwordInput.sendKeys(process.env.TEST_KAKAO_PASSWORD || 'testpassword');
        console.log('Password entered');

        const signInButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 30000);
        await signInButton.click();
        console.log('Sign in button clicked');

        // 원래 창으로 돌아가기
        await driver.switchTo().window(handles[0]);
        console.log('Switched back to main window');

        // 로그인 완료 대기 (60초)
        await driver.wait(until.urlContains('/dashboard'), 60000);
        console.log('Login completed');

        // 추가 대기 시간 (30초)
        await new Promise((resolve) => setTimeout(resolve, 30000));
    } catch (error) {
        console.error('Login process error:', error);
        throw error;
    }
}
