// electron/main.ts
import * as dotenv from 'dotenv';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import serve from 'electron-serve';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Store from 'electron-store';
import axios from 'axios';
import fs from 'node:fs';
import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import type { Server } from 'node:http';

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
    // In production, try multiple possible locations for .env
    const possiblePaths = [
        join(process.resourcesPath, '.env'),
        join(__dirname, '.env'),
        join(__dirname, '../.env'),
        join(__dirname, '../../.env'),
    ];

    log('Searching for .env file in:', possiblePaths);

    for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
            log('Found .env file at:', path);
            dotenv.config({ path });
            break;
        }
    }
} else {
    // In development, use the .env file in the project root
    dotenv.config();
}

// 환경 변수 로드 확인
log('Environment variables loaded:', {
    clientId: process.env.VITE_GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
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

// 개발 환경에서 SSL 인증서 검증 무시
if (!app.isPackaged) {
    app.commandLine.appendSwitch('ignore-certificate-errors');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

if (app.isPackaged) {
    serve({ directory: 'out' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

// 고정된 OAuth 콜백 포트 설정
const OAUTH_CALLBACK_PORT = 42813;

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;
let server: Server | null = null;

// Register custom protocol on app ready
app.whenReady().then(() => {
    app.setAsDefaultProtocolClient('graduable');
});

// 메인 윈도우 생성
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
        },
    });

    // Chrome user agent 설정
    mainWindow.webContents.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    );

    if (app.isPackaged) {
        await mainWindow.loadFile(join(__dirname, '../index.html'));
    } else {
        const port = process.argv[2] || 5173;
        await mainWindow.loadURL(`http://localhost:${port}/`);
        mainWindow.webContents.openDevTools();
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

// Google OAuth 내장 창 핸들러 (추가)
ipcMain.handle('open-google-auth-window', () => {
    createAuthWindow();
    return Promise.resolve();
});

// Google OAuth: 외부 브라우저 열기 (기존 방식)
ipcMain.handle('open-google-auth', async () => {
    try {
        const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
        const redirectUri = 'http://localhost:42813/callback';
        const scope = encodeURIComponent('openid email profile');
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&scope=${scope}&access_type=offline`;

        // 기본 브라우저에서 열기
        await shell.openExternal(authUrl);
        log('Google OAuth URL opened in default browser:', authUrl);
    } catch (error) {
        log('Error opening Google OAuth URL:', error);
        mainWindow?.webContents.send('oauth-error', '브라우저를 열 수 없습니다.');
    }
});

// Google OAuth 내장 창 생성 (추가)
const createAuthWindow = async () => {
    try {
        // 이미 열려있는 인증 창이 있으면 닫기
        if (authWindow && !authWindow.isDestroyed()) {
            authWindow.close();
        }

        authWindow = new BrowserWindow({
            width: 600,
            height: 700,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
            },
            parent: mainWindow || undefined,
            modal: true,
        });

        const clientId = process.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            log('Google Client ID가 설정되지 않았습니다!');
            mainWindow?.webContents.send('oauth-error', 'Client ID가 설정되지 않았습니다.');
            return;
        }

        // 리디렉션 URI 설정
        const redirectUri = `http://localhost:${OAUTH_CALLBACK_PORT}/callback`;
        const scope = encodeURIComponent('openid email profile');

        const authUrl =
            `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `response_type=code&` +
            `scope=${scope}&` +
            `access_type=offline&` +
            `prompt=consent`;

        log('Loading Google OAuth URL in internal window:', authUrl);
        authWindow.loadURL(authUrl);

        authWindow.on('closed', () => {
            authWindow = null;
        });
    } catch (error) {
        log('OAuth 창 생성 실패:', error);
    }
};

// Start local server for OAuth callback
function startLocalServer() {
    if (server) {
        try {
            server.close();
            log('Closed existing OAuth callback server');
        } catch (error) {
            log('Error closing existing server:', error);
        }
        server = null;
    }

    const expressApp = express();
    const port = OAUTH_CALLBACK_PORT;

    expressApp.get('/callback', async (req, res) => {
        log('Received OAuth callback:', req.query);
        const code = req.query.code as string;
        const error = req.query.error as string;

        if (error) {
            log('OAuth error from callback:', error);
            mainWindow?.webContents.send('oauth-error', error);
            res.send(`
                <html>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #f44336;">인증 실패</h1>
                        <p>오류: ${error}</p>
                        <p>이 창을 닫고 다시 시도해주세요.</p>
                        <script>setTimeout(() => { window.close(); }, 3000);</script>
                    </body>
                </html>
            `);
            return;
        }

        if (code) {
            try {
                const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
                const clientSecret = process.env.VITE_GOOGLE_CLIENT_SECRET;
                const redirectUri = `http://localhost:${port}/callback`;

                if (!clientId || !clientSecret) {
                    throw new Error('OAuth 환경 변수가 설정되지 않았습니다');
                }

                const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

                log('Exchanging code for tokens...');
                const { tokens } = await oauth2Client.getToken(code);

                log('Getting user info...');
                const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                    headers: { Authorization: `Bearer ${tokens.access_token}` },
                });

                log('OAuth successful, user info:', userResponse.data);
                mainWindow?.webContents.send('oauth-success', {
                    googleId: userResponse.data.id,
                    email: userResponse.data.email,
                    name: userResponse.data.name,
                });

                res.send(`
                    <html>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                            <h1 style="color: #4CAF50;">로그인 성공!</h1>
                            <p>이 창을 닫으셔도 됩니다.</p>
                            <script>setTimeout(() => { window.close(); }, 1500);</script>
                        </body>
                    </html>
                `);
            } catch (error) {
                log('OAuth error:', error);
                mainWindow?.webContents.send('oauth-error', '인증 실패');
                res.send(`
                    <html>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                            <h1 style="color: #f44336;">로그인 실패</h1>
                            <p>이 창을 닫고 다시 시도해주세요.</p>
                            <script>setTimeout(() => { window.close(); }, 3000);</script>
                        </body>
                    </html>
                `);
            }
        } else {
            log('No code received in callback');
            res.send(`
                <html>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #f44336;">오류 발생</h1>
                        <p>인증 코드를 받지 못했습니다.</p>
                        <script>setTimeout(() => { window.close(); }, 3000);</script>
                    </body>
                </html>
            `);
        }

        // 인증 창 닫기
        if (authWindow && !authWindow.isDestroyed()) {
            setTimeout(() => {
                authWindow?.close();
                authWindow = null;
            }, 2000);
        }
    });

    server = expressApp.listen(port, () => {
        log(`OAuth callback server running at http://localhost:${port}`);
    });
}

// Windows: handle protocol on second-instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, argv) => {
        // Windows: protocol URL is in argv
        const urlArg = argv.find((arg) => arg.startsWith('graduable://'));
        if (urlArg) {
            app.emit('open-url', event, urlArg);
        }

        // 창이 열려 있으면 포커스
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

// 앱 이벤트 핸들러
app.on('ready', async () => {
    // 앱 시작 시 로컬 서버 시작
    startLocalServer();

    // 메인 윈도우 생성
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (server) {
        server.close();
        server = null;
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// 앱 종료 시 정리
app.on('quit', () => {
    if (server) {
        server.close();
        server = null;
    }
});
