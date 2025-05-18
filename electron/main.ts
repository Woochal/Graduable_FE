// electron/main.ts
import * as dotenv from "dotenv";
dotenv.config();

import { app, BrowserWindow, ipcMain, protocol } from "electron";
import path from "node:path";
import Store from "electron-store";
import express from "express";
import axios from "axios";
import fs from 'fs';

interface WindowConfig {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
}

interface StoreSchema {
	"window-config": WindowConfig;
	user: any;
	userInfo: any;
	[key: `userInfo_${string}`]: any; // googleId별 저장
}

// 프로덕션 모드 감지 로직 강화
const isProd = process.env.NODE_ENV === "production" || app.isPackaged;
const store = new Store<StoreSchema>();

// 개발 환경에서 SSL 인증서 검증 무시
if (!isProd) {
	app.commandLine.appendSwitch("ignore-certificate-errors");
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

// userData 경로 설정
if (!isProd) {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;
let authServer: any = null;

// 사용 가능한 포트 찾기
const findAvailablePort = (): Promise<number> => {
	return new Promise((resolve) => {
		const server = express().listen(0, "localhost", () => {
			const port = (server.address() as any).port;
			server.close(() => resolve(port));
		});
	});
};

// OAuth 로컬 서버 시작
const startAuthServer = (port: number): Promise<void> => {
	return new Promise((resolve) => {
		const app = express();

		app.get("/auth/callback", async (req, res) => {
			const { code, error } = req.query;

			if (error) {
				res.send(`
					<html>
						<body>
							<h1>인증 실패</h1>
							<p>${error}</p>
						</body>
					</html>
				`);
				mainWindow?.webContents.send("oauth-error", error);
				return;
			}

			try {
				// Google OAuth 처리
				const tokenResponse = await axios.post(
					"https://oauth2.googleapis.com/token",
					{
						code,
						client_id: process.env.VITE_GOOGLE_CLIENT_ID,
						client_secret: process.env.VITE_GOOGLE_CLIENT_SECRET,
						redirect_uri: `http://localhost:${port}/auth/callback`,
						grant_type: "authorization_code",
					},
				);

				const { access_token } = tokenResponse.data;

				// 사용자 정보 가져오기
				const userResponse = await axios.get(
					"https://www.googleapis.com/oauth2/v2/userinfo",
					{
						headers: { Authorization: `Bearer ${access_token}` },
					},
				);

				const userData = userResponse.data;

				// 메인 창으로 사용자 정보 전달
				mainWindow?.webContents.send("oauth-success", {
					googleId: userData.id,
					email: userData.email,
					name: userData.name,
				});

				res.send(`
					<html>
						<body>
							<h1>인증 성공!</h1>
							<p>이 창은 자동으로 닫힙니다.</p>
							<script>
								setTimeout(() => { window.close(); }, 1500);
							</script>
						</body>
					</html>
				`);
			} catch (error) {
				console.error("OAuth 처리 실패:", error);
				res.status(500).send("인증 처리 중 오류가 발생했습니다.");
				mainWindow?.webContents.send("oauth-error", "인증 실패");
			}

			if (authWindow && !authWindow.isDestroyed()) {
				setTimeout(() => {
					authWindow?.close();
				}, 2000);
			}
		});

		authServer = app.listen(port, "localhost", () => {
			console.log(`OAuth 서버 시작: http://localhost:${port}`);
			resolve();
		});
	});
};

// Google OAuth 창 생성
const createAuthWindow = async () => {
	try {
		const port = await findAvailablePort();
		await startAuthServer(port);

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
			console.error("Google Client ID가 설정되지 않았습니다!");
			mainWindow?.webContents.send(
				"oauth-error",
				"Client ID가 설정되지 않았습니다.",
			);
			return;
		}

		const redirectUri = `http://localhost:${port}/auth/callback`;

		const authUrl =
			`https://accounts.google.com/o/oauth2/v2/auth?` +
			`client_id=${clientId}&` +
			`redirect_uri=${encodeURIComponent(redirectUri)}&` +
			`response_type=code&` +
			`scope=openid email profile&` +
			`access_type=offline&` +
			`prompt=consent`;

		authWindow.loadURL(authUrl);

		authWindow.on("closed", () => {
			authWindow = null;
			if (authServer) {
				authServer.close();
				authServer = null;
			}
		});
	} catch (error) {
		console.error("OAuth 창 생성 실패:", error);
		if (authServer) {
			authServer.close();
			authServer = null;
		}
	}
};

// 디렉토리 및 파일 존재 여부 확인 함수
const isPathValid = (filePath: string): boolean => {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error(`Error checking path: ${filePath}`, err);
        return false;
    }
};

// 디렉토리 내용 로그 출력 함수
const logDirectoryContents = (dirPath: string): void => {
    try {
        if (isPathValid(dirPath)) {
            console.log(`Contents of directory ${dirPath}:`);
            const items = fs.readdirSync(dirPath);
            items.forEach(item => {
                try {
                    const itemPath = path.join(dirPath, item);
                    const stats = fs.statSync(itemPath);
                    console.log(`  ${item} (${stats.isDirectory() ? 'directory' : 'file'})`);
                } catch (err) {
                    console.error(`  Error reading ${item}:`, err);
                }
            });
        } else {
            console.log(`Directory does not exist: ${dirPath}`);
        }
    } catch (err) {
        console.error(`Error reading directory: ${dirPath}`, err);
    }
};

// 메인 윈도우 생성
const createMainWindow = async () => {
	const windowConfig = store.get("window-config") || {};

	mainWindow = new BrowserWindow({
		width: 1280,
		height: 832,
		minWidth: 1280,
		minHeight: 800,
		useContentSize: true, // width/height가 콘텐츠 크기만으로 되도록. 이거 없으면 앱 상단 메뉴도 포함되서 계산됨
		x: windowConfig.x,
		y: windowConfig.y,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// 환경 정보 출력
	console.log("App Path:", app.getAppPath());
	console.log("Exe Path:", app.getPath("exe"));
	console.log("Is Packaged:", app.isPackaged);
	console.log("Current Working Directory:", process.cwd());
	console.log("Resources Path:", process.resourcesPath);
	console.log("NODE_ENV:", process.env.NODE_ENV);

	// 로딩 방식 개선
	if (isProd) {
		// 주요 앱 디렉토리 내용 로그
		logDirectoryContents(app.getAppPath());
		logDirectoryContents(path.dirname(app.getPath("exe")));
		if (process.resourcesPath) {
			logDirectoryContents(process.resourcesPath);
			logDirectoryContents(path.join(process.resourcesPath, "app"));
			logDirectoryContents(path.join(process.resourcesPath, "app", "dist"));
			logDirectoryContents(path.join(process.resourcesPath, "dist"));
		}

		// 다양한 경로를 시도하여 index.html 파일 찾기
		const possiblePaths = [
			// 추가적인 위치들을 전용 함수로 찾아봄
			...findAllPossibleIndexPaths(),
			// 기존 경로들
			path.join(app.getAppPath(), "dist", "index.html"),
			path.join(process.resourcesPath, "app", "dist", "index.html"),
			path.join(process.resourcesPath, "dist", "index.html"),
			path.join(app.getPath("exe"), "../resources/dist/index.html"),
			path.join(app.getPath("exe"), "../resources/app/dist/index.html"),
			path.join(process.resourcesPath, "app.asar", "dist", "index.html"),
			path.join(process.resourcesPath, "app.asar.unpacked", "dist", "index.html"),
			path.join(process.cwd(), "dist", "index.html"),
			path.join(process.cwd(), "resources", "app", "dist", "index.html"),
		];

		let indexPath = '';
		
		// 실제로 존재하는 경로 찾기
		for (const p of possiblePaths) {
			console.log("Checking path:", p);
			if (isPathValid(p)) {
				indexPath = p;
				console.log("Found index.html at:", indexPath);
				break;
			}
		}

		if (indexPath) {
			console.log("Loading file from:", indexPath);
			try {
				await mainWindow.loadFile(indexPath);
				console.log("Successfully loaded index.html");
			} catch (err) {
				console.error("Error loading file:", err);
				// 추가 폴백: 로컬 파일 URL로 시도
				try {
					const fileUrl = `file://${indexPath}`;
					console.log("Trying with file URL:", fileUrl);
					await mainWindow.loadURL(fileUrl);
					console.log("Successfully loaded with file URL");
				} catch (urlErr) {
					console.error("Failed to load with file URL:", urlErr);
				}
			}
		} else {
			console.error("Could not find index.html in any expected location");
			
			// 마지막 수단: extraResources에서 직접 찾기
			try {
				// 여러 가능한 extraResources 경로 시도
				const extraResourcesPaths = [
					path.join(process.resourcesPath, "app", "dist", "index.html"),
					path.join(process.resourcesPath, "dist", "index.html"),
				];
				
				let foundExtraPath = false;
				
				for (const extraPath of extraResourcesPaths) {
					console.log("Trying extraResources path:", extraPath);
					
					if (isPathValid(extraPath)) {
						console.log("Found index.html in extraResources:", extraPath);
						await mainWindow.loadFile(extraPath);
						foundExtraPath = true;
						break;
					}
				}
				
				if (!foundExtraPath) {
					// 파일 시스템 전체 검색
					console.log("Searching for index.html recursively...");
					const searchResult = findIndexHtmlRecursively(process.resourcesPath);
					
					if (searchResult) {
						console.log("Found index.html through recursive search:", searchResult);
						await mainWindow.loadFile(searchResult);
					} else {
						// 최후의 수단: 개발 서버에서 로드 (빌드된 파일 못 찾는 경우)
						console.error("Failed to find index.html through all methods");
						displayErrorPage("Could not find index.html file");
					}
				}
			} catch (err) {
				console.error("Final attempt failed:", err);
				displayErrorPage(`Error: ${(err as Error).message}`);
			}
		}
	} else {
		const port = process.argv[2] || 5173;
		await mainWindow.loadURL(`http://localhost:${port}/`);
	}

	// 창 크기 로그 출력
	const size = mainWindow.getSize();
	console.log(`Window size: ${size[0]}x${size[1]}`);
	
	// 디버깅 도움을 위해 개발자 도구 열기 (배포 버전에서도 문제 진단을 위해)
	mainWindow.webContents.openDevTools();

	mainWindow.on("close", () => {
		if (!mainWindow?.isMaximized()) {
			const bounds = mainWindow?.getBounds();
			if (bounds) {
				store.set("window-config", bounds);
			}
		}
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
};

// 에러 페이지 표시
function displayErrorPage(errorMessage: string) {
	if (mainWindow) {
		mainWindow.webContents.loadURL(`data:text/html,<html><body>
			<h1>Failed to load application</h1>
			<p>${errorMessage}</p>
			<h2>Debug Information</h2>
			<pre>
App Path: ${app.getAppPath()}
Exe Path: ${app.getPath("exe")}
Is Packaged: ${app.isPackaged}
Current Working Directory: ${process.cwd()}
Resources Path: ${process.resourcesPath}
NODE_ENV: ${process.env.NODE_ENV}
			</pre>
		</body></html>`);
	}
}

// 모든 가능한 index.html 경로 찾기
function findAllPossibleIndexPaths(): string[] {
	const baseLocations = [
		app.getAppPath(),
		process.resourcesPath,
		path.dirname(app.getPath("exe")),
		process.cwd(),
		path.join(process.resourcesPath, "app"),
		path.join(process.resourcesPath, "app.asar"),
		path.join(process.resourcesPath, "app.asar.unpacked"),
	];
	
	const subPaths = [
		"dist",
		"app/dist",
		"resources/dist",
		"resources/app/dist",
	];
	
	const result: string[] = [];
	
	for (const base of baseLocations) {
		if (!base) continue;
		
		// 기본 경로에 index.html이 있는지 확인
		result.push(path.join(base, "index.html"));
		
		// 하위 경로 조합
		for (const sub of subPaths) {
			result.push(path.join(base, sub, "index.html"));
		}
	}
	
	return result;
}

// index.html 파일 재귀적 검색
function findIndexHtmlRecursively(startDir: string, maxDepth = 3): string | null {
    if (maxDepth <= 0) return null;
    
    try {
        if (!isPathValid(startDir)) return null;
        
        const files = fs.readdirSync(startDir);
        
        // 현재 디렉토리에서 index.html 찾기
        const indexHtml = files.find(file => file === 'index.html');
        if (indexHtml) {
            return path.join(startDir, indexHtml);
        }
        
        // dist 디렉토리 우선 확인
        const distDir = files.find(file => file === 'dist' && 
            fs.statSync(path.join(startDir, file)).isDirectory());
        
        if (distDir) {
            const distPath = path.join(startDir, distDir);
            const inDist = findIndexHtmlRecursively(distPath, maxDepth - 1);
            if (inDist) return inDist;
        }
        
        // 다른 하위 디렉토리 확인
        for (const file of files) {
            const filePath = path.join(startDir, file);
            try {
                if (fs.statSync(filePath).isDirectory() && file !== 'dist') {
                    const found = findIndexHtmlRecursively(filePath, maxDepth - 1);
                    if (found) return found;
                }
            } catch (err) {
                console.error(`Error checking directory ${filePath}:`, err);
            }
        }
    } catch (err) {
        console.error(`Error searching directory ${startDir}:`, err);
    }
    
    return null;
}

// IPC 핸들러들
ipcMain.handle("get-store-value", (_, key: string) => {
	return store.get(key);
});

ipcMain.handle("set-store-value", (_, key: string, value: any) => {
	store.set(key, value);
});

ipcMain.handle("open-google-auth", () => {
	createAuthWindow();
});

ipcMain.handle("remove-store-value", (_, key: string) => {
	store.delete(key);
});

// 로그아웃 - user와 userInfo 모두 삭제
ipcMain.handle("logout", () => {
	store.delete("user");
	store.delete("userInfo");
});

// 콘솔 로그를 렌더러 프로세스로 보내는 함수
const sendLogToRenderer = (message: string) => {
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send("main-process-log", message);
	}
};

// 콘솔 로그 재정의
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args: any[]) => {
	const message = args.map(arg => 
		typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
	).join(' ');
	
	originalConsoleLog.apply(console, args);
	sendLogToRenderer(`[LOG] ${message}`);
};

console.error = (...args: any[]) => {
	const message = args.map(arg => 
		typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
	).join(' ');
	
	originalConsoleError.apply(console, args);
	sendLogToRenderer(`[ERROR] ${message}`);
};

// 앱 이벤트 핸들러
app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});
