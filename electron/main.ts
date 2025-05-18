// electron/main.ts
import * as dotenv from 'dotenv';
import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import serve from 'electron-serve';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Store from 'electron-store';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        join(process.resourcesPath, '.env'),
        join(__dirname, '.env'),
        join(__dirname, '../.env'),
        join(__dirname, '../../.env'),
        join(app.getAppPath(), '.env'),
    ];

    log('Searching for .env file in:', possiblePaths);

    let envLoaded = false;
    for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
            log('Found .env file at:', path);
            dotenv.config({ path });
            envLoaded = true;
            break;
        }
    }

    if (!envLoaded) {
        log('No .env file found, using default environment variables');
        // 기본 환경 변수 설정
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

const store = new Store<StoreSchema>();
store.clear(); // 스토어 초기화
log('Store cleared');

if (!app.isPackaged) {
    app.commandLine.appendSwitch('ignore-certificate-errors');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

if (app.isPackaged) {
    serve({ directory: 'out' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    // 프로토콜 핸들러 등록
    protocol.registerFileProtocol('file', (request, callback) => {
        const url = request.url;
        log('File protocol request received:', url);

        // auth 리디렉션 처리
        if (url.includes('/auth')) {
            log('Auth redirect detected:', url);
            if (mainWindow) {
                // URL에서 code 파라미터 추출
                const code = new URL(url).searchParams.get('code');
                if (code) {
                    log('Auth code received:', code);
                    // 메인 페이지로 리디렉션하면서 code 전달
                    mainWindow.loadFile(join(__dirname, '../index.html'), {
                        query: { code },
                    });
                } else {
                    mainWindow.loadFile(join(__dirname, '../index.html'));
                }
            } else {
                log('Main window not found');
            }
            return;
        }

        callback({ path: url });
    });

    // HTTP 프로토콜 핸들러 등록
    protocol.registerHttpProtocol('http', (request, callback) => {
        const url = request.url;
        log('HTTP protocol request received:', url);

        // auth 리디렉션 처리
        if (url.includes('/auth')) {
            log('Auth redirect detected:', url);
            if (mainWindow) {
                // URL에서 code 파라미터 추출
                const code = new URL(url).searchParams.get('code');
                if (code) {
                    log('Auth code received:', code);
                    // 메인 페이지로 리디렉션하면서 code 전달
                    mainWindow.loadFile(join(__dirname, '../index.html'), {
                        query: { code },
                    });
                } else {
                    mainWindow.loadFile(join(__dirname, '../index.html'));
                }
            } else {
                log('Main window not found');
            }
            return;
        }

        callback({ url });
    });
});

const createMainWindow = async () => {
    const windowConfig = store.get('window-config') || {};

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 832,
        minWidth: 1280,
        minHeight: 800,
        x: windowConfig.x,
        y: windowConfig.y,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js'),
            webSecurity: false, // 개발 중에만 false로 설정
        },
    });

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
        await mainWindow.loadFile(join(__dirname, '../index.html'), {
            hash: '/',
        });
    } else {
        const port = process.argv[2] || 5173;
        const url = `http://localhost:${port}/`;
        log('Loading development build:', url);
        await mainWindow.loadURL(url);
    }

    mainWindow.on('close', () => {
        if (!mainWindow?.isMaximized()) {
            const bounds = mainWindow?.getBounds();
            if (bounds) {
                store.set('window-config', bounds);
            }
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

// IPC 핸들러들
ipcMain.handle('get-store-value', (_, key: string) => {
    return store.get(key);
});

ipcMain.handle('set-store-value', (_, key: string, value: unknown) => {
    store.set(key, value);
});

ipcMain.handle('remove-store-value', (_, key: string) => {
    store.delete(key);
});

// 로그아웃 핸들러
ipcMain.handle('logout', () => {
    store.delete('user');
    store.delete('userInfo');
    log('User logged out');
});

// 앱 이벤트 핸들러
app.on('ready', async () => {
    log('App is ready');
    createMainWindow();
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
