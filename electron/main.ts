// electron/main.ts
const dotenv = require('dotenv');
const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const path = require('node:path');
const Store = require('electron-store');
const fs = require('node:fs');
const { join } = require('path');

// 로그 출력을 위한 함수
const log = (message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
    if (data) {
        console.log(JSON.stringify(data, null, 2));
    }
};

// 환경 변수 로드 설정
if (app.isPackaged) {
    const possiblePaths = [
        path.join(process.resourcesPath, '.env'),
        path.join(__dirname, '.env'),
        path.join(__dirname, '../.env'),
        path.join(__dirname, '../../.env'),
        path.join(app.getAppPath(), '.env'),
    ];

    log('Searching for .env file in:', possiblePaths);

    let envLoaded = false;
    for (const envPath of possiblePaths) {
        if (fs.existsSync(envPath)) {
            log('Found .env file at:', envPath);
            dotenv.config({ path: envPath });
            envLoaded = true;
            break;
        }
    }

    if (!envLoaded) {
        log('No .env file found, using default environment variables');
        process.env.NODE_ENV = 'production';
    }
} else {
    dotenv.config();
}

// 환경 변수 로드 확인
log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    VITE_KAKAO_JAVASCRIPT_KEY: process.env.VITE_KAKAO_JAVASCRIPT_KEY ? 'Set' : 'Not set',
    VITE_KAKAO_REST_API_KEY: process.env.VITE_KAKAO_REST_API_KEY ? 'Set' : 'Not set',
    VITE_API_URL: process.env.VITE_API_URL,
});

interface WindowConfig {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

interface StoreSchema {
    'window-config': WindowConfig;
    user: Record<string, unknown>;
    userInfo: Record<string, unknown>;
    [key: `userInfo_${string}`]: Record<string, unknown>;
}

// Store 초기화
const store = new Store();
log('Store initialized');

if (!app.isPackaged) {
    app.commandLine.appendSwitch('ignore-certificate-errors');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
} else {
    app.commandLine.appendSwitch('ignore-certificate-errors');
    app.commandLine.appendSwitch('disable-site-isolation-trials');
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
    app.commandLine.appendSwitch('disable-web-security');
    app.commandLine.appendSwitch('allow-running-insecure-content');
}

if (!app.isPackaged) {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: Electron.BrowserWindow | null = null;

// 프로토콜 등록을 app.whenReady() 이전에 수행
protocol.registerSchemesAsPrivileged([
    { scheme: 'http', privileges: { secure: true, standard: true, supportFetchAPI: true } },
    { scheme: 'file', privileges: { secure: true, standard: true } },
]);

// serve({ directory: 'out' }) 제거
// mainWindow 생성 보장 함수
async function ensureMainWindow() {
    if (!mainWindow) {
        await createMainWindow();
    }
    return mainWindow;
}

app.whenReady().then(() => {
    // 프로토콜 핸들러 등록
    protocol.registerHttpProtocol(
        'http',
        (request: Electron.ProtocolRequest, callback: (response: Electron.ProtocolResponse) => void) => {
            const url = request.url;
            log('HTTP protocol request received:', url);

            try {
                // auth 리디렉션 처리
                if (url.startsWith('http://localhost/auth')) {
                    log('Auth redirect detected:', url);
                    if (!mainWindow) {
                        log('Main window not found, creating new window');
                        createMainWindow();
                    }

                    // URL에서 code 파라미터 추출
                    const code = new URL(url).searchParams.get('code');
                    log('Extracted code:', code);

                    if (code) {
                        // 프로덕션 환경에서는 file:// 프로토콜 사용
                        const indexPath = join(__dirname, '../index.html');
                        log('Loading file:', indexPath);

                        if (app.isPackaged) {
                            log('Loading production build with code:', code);
                            const targetUrl = `file://${indexPath}?code=${code}`;
                            log('Target URL:', targetUrl);
                            mainWindow?.loadURL(targetUrl);
                        } else {
                            const port = process.argv[2] || 5173;
                            const devUrl = `http://localhost:${port}/?code=${code}`;
                            log('Loading development URL:', devUrl);
                            mainWindow?.loadURL(devUrl);
                        }
                    }
                    return;
                }

                // localhost:5173 요청은 Vite 개발 서버로 전달
                if (url.startsWith('http://localhost:5173')) {
                    log('Allowing Vite dev server request:', url);
                    callback({ url });
                    return;
                }

                // 다른 모든 요청은 그대로 전달
                callback({ url });
            } catch (error) {
                log('Error in HTTP protocol handler:', error);
                callback({ url });
            }
        }
    );

    protocol.registerFileProtocol(
        'file',
        (request: Electron.ProtocolRequest, callback: (response: Electron.ProtocolResponse) => void) => {
            const url = request.url;
            log('File protocol request received:', url);

            try {
                if (url.includes('/auth')) {
                    log('Auth redirect detected in file protocol:', url);
                    if (!mainWindow) {
                        log('Main window not found, creating new window');
                        createMainWindow();
                    }

                    const code = new URL(url).searchParams.get('code');
                    log('Extracted code from file protocol:', code);

                    if (code) {
                        const indexPath = join(__dirname, '../index.html');
                        log('Loading file with code:', code);
                        mainWindow?.loadFile(indexPath, {
                            query: { code },
                        });
                    }
                    return;
                }

                callback({ path: url });
            } catch (error) {
                log('Error in File protocol handler:', error);
                callback({ path: url });
            }
        }
    );

    protocol.registerHttpProtocol(
        'graduable',
        async (request: Electron.ProtocolRequest, callback: (response: Electron.ProtocolResponse) => void) => {
            const url = request.url;
            log('Graduable protocol request received:', url);

            if (url.includes('/auth')) {
                log('Auth redirect detected:', url);
                const win = await ensureMainWindow();
                if (win) {
                    const code = new URL(url).searchParams.get('code');
                    const userInfo = await store.get('userInfo');
                    const targetPath = userInfo ? '/' : '/semester';
                    if (code) {
                        log('Auth code received:', code);
                        win.loadFile(join(__dirname, '../index.html'), {
                            query: { code },
                            hash: targetPath,
                        });
                    } else {
                        win.loadFile(join(__dirname, '../index.html'), {
                            hash: targetPath,
                        });
                    }
                } else {
                    log('Main window not found');
                }
                return;
            }
            callback({ url });
        }
    );

    log('App is ready');
    createMainWindow();
});

const createMainWindow = async () => {
    try {
        const windowConfig = store.get('window-config') || {};
        log('Creating main window with config:', windowConfig);

        mainWindow = new BrowserWindow({
            width: 1280,
            height: 832,
            minWidth: 1280,
            minHeight: 800,
            x: windowConfig.x,
            y: windowConfig.y,
            icon: join(__dirname, '../../src/assets/Logo.png'),
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: join(__dirname, 'preload.js'),
                webSecurity: false,
                allowRunningInsecureContent: true,
                webviewTag: true,
                partition: 'persist:main',
            },
        });

        if (!mainWindow) {
            throw new Error('Failed to create main window');
        }

        // 네트워크 요청 인터셉트
        mainWindow.webContents.session.webRequest.onBeforeRequest(
            { urls: ['http://localhost/auth*', 'http://localhost:5173/auth*'] },
            async (details, callback) => {
                log('Intercepted request:', details.url);
                const url = new URL(details.url);
                const code = url.searchParams.get('code');

                if (code) {
                    log('Auth code received:', code);

                    // 인증 코드를 store에 저장
                    store.set('auth_code', code);
                    log('Auth code saved to store');

                    // 메인 페이지로 이동
                    if (app.isPackaged) {
                        const indexPath = join(__dirname, '../index.html');
                        log('Loading production build');
                        await mainWindow?.loadFile(indexPath);
                    } else {
                        const port = process.argv[2] || 5173;
                        const devUrl = `http://localhost:${port}/`;
                        log('Loading development URL:', devUrl);
                        await mainWindow?.loadURL(devUrl);
                    }

                    // 페이지 로드 후 IPC 이벤트 전송
                    mainWindow?.webContents.once('did-finish-load', () => {
                        log('Page loaded, sending auth code via IPC');
                        mainWindow?.webContents.send('auth-code', code);
                    });

                    callback({ cancel: true });
                } else {
                    callback({ cancel: false });
                }
            }
        );

        mainWindow.webContents.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        );

        // 개발자 도구 자동 열기
        mainWindow.webContents.openDevTools();

        // 페이지 로드 이벤트 리스너
        mainWindow.webContents.on('did-finish-load', () => {
            log('Page loaded successfully');
        });

        mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
            log('Page load failed:', { errorCode, errorDescription });
        });

        if (app.isPackaged) {
            log('Loading production build');
            const indexPath = join(__dirname, '../index.html');
            log('Loading file:', indexPath);
            await mainWindow.loadFile(indexPath, {
                hash: '/',
            });
        } else {
            const port = process.argv[2] || 5173;
            const url = `http://localhost:${port}/`;
            log('Loading development build:', url);
            await mainWindow.loadURL(url);
        }

        mainWindow.on('close', () => {
            const currentWindow = mainWindow;
            if (currentWindow && !currentWindow.isMaximized()) {
                const bounds = currentWindow.getBounds();
                if (bounds) {
                    store.set('window-config', bounds);
                }
            }
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });

        return mainWindow;
    } catch (error) {
        log('Error creating main window:', error);
        throw error;
    }
};

// IPC 핸들러들
ipcMain.handle('get-store-value', (_: Electron.IpcMainInvokeEvent, key: string) => {
    return store.get(key);
});

ipcMain.handle('set-store-value', (_: Electron.IpcMainInvokeEvent, key: string, value: unknown) => {
    store.set(key, value);
});

ipcMain.handle('remove-store-value', (_: Electron.IpcMainInvokeEvent, key: string) => {
    store.delete(key);
});

// 로그아웃 핸들러
ipcMain.handle('logout', () => {
    store.delete('user');
    store.delete('userInfo');
    log('User logged out');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
