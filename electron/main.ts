// electron/main.ts
import * as dotenv from "dotenv";
dotenv.config();

import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import path from "node:path";
import Store from "electron-store";
import express from "express";
import axios from "axios";

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

const isProd = process.env.NODE_ENV === "production";
const store = new Store<StoreSchema>();

// 개발 환경에서 SSL 인증서 검증 무시
if (!isProd) {
	app.commandLine.appendSwitch("ignore-certificate-errors");
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

if (isProd) {
	serve({ directory: "out" });
} else {
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

// 메인 윈도우 생성
const createMainWindow = async () => {
	const windowConfig = store.get("window-config") || {};

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
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (isProd) {
		await mainWindow.loadURL("app://./index.html");
	} else {
		const port = process.argv[2] || 5173;
		await mainWindow.loadURL(`http://localhost:${port}/`);
		mainWindow.webContents.openDevTools();
	}

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
