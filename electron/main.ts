// 필요한 모듈 가져오기
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import path from "node:path";
import Store from "electron-store";
/*
const windowConfig = store.get("window-config") || {};

이전에 저장된 창의 설정(크기, 위치)을 electron-store를 통해 불러옵니다.
만약 저장된 설정이 없다면 빈 객체({})를 사용합니다.


const { width, height } = screen.getPrimaryDisplay().workAreaSize;

현재 화면(주 디스플레이)의 작업 영역 크기를 가져옵니다.
하지만 이 값은 실제로 아래 코드에서 사용되지 않고 있습니다.


mainWindow = new BrowserWindow({ ... })

메인 창을 생성합니다.
창의 속성:

width: windowConfig.width - 이전에 저장된 창의 너비를 사용합니다.
height: windowConfig.height - 이전에 저장된 창의 높이를 사용합니다.
x: windowConfig.x - 이전에 저장된 창의 x 위치를 사용합니다.
y: windowConfig.y - 이전에 저장된 창의 y 위치를 사용합니다.
*/

/*
Electron 애플리케이션의 핵심으로, 앱 생명주기 관리, 창 생성/관리, IPC 통신 설정 등을 담당.
 개발 환경과 프로덕션 환경을 구분하여 처리하고, 창의 상태를 저장/복원하는 기능을 포함
*/

// 창 설정 타입 정의
interface WindowConfig {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
}

// 스토어 스키마 타입 정의
interface StoreSchema {
	"window-config": WindowConfig;
}

// 프로덕션 환경인지 확인
const isProd = process.env.NODE_ENV === "production";

// 스토어 인스턴스 생성
const store = new Store<StoreSchema>() as any;

// 프로덕션 모드에서는 정적 파일 서빙
if (isProd) {
	serve({ directory: "out" });
} else {
	// 개발 모드에서는 별도의 사용자 데이터 경로 사용
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

// 메인 윈도우 변수
let mainWindow: BrowserWindow | null = null;

// 메인 윈도우 생성 함수
const createMainWindow = async () => {
	// 저장된 창 설정 불러오기
	const windowConfig = store.get("window-config") || {};
	//const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	// 메인 윈도우 생성
	mainWindow = new BrowserWindow({
		width: 2000, // 고정된 기본 너비 설정
		height: 1400, // 고정된 기본 높이 설정
		minWidth: 1200, // 최소 너비 설정
		minHeight: 800, // 최소 높이 설정
		x: windowConfig.x,
		y: windowConfig.y,
		webPreferences: {
			nodeIntegration: false, // 보안을 위해 비활성화
			contextIsolation: true, // 보안을 위해 활성화
			preload: path.join(__dirname, "preload.js"), // preload 스크립트 경로
		},
	});

	// 환경에 따라 URL 로드
	if (isProd) {
		await mainWindow.loadURL("app://./index.html");
	} else {
		const port = process.argv[2] || 5173; // 개발 서버 포트
		await mainWindow.loadURL(`http://localhost:${port}/`);
		mainWindow.webContents.openDevTools(); // 개발 모드에서 개발자 도구 열기
	}

	// 창 위치 및 크기 저장
	mainWindow.on("close", () => {
		if (!mainWindow?.isMaximized()) {
			const bounds = mainWindow?.getBounds();
			if (bounds) {
				store.set("window-config", bounds);
			}
		}
	});

	// 창이 닫힐 때 메인 윈도우 변수 초기화
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
};

// IPC 통신 설정: 스토어 값 가져오기
ipcMain.handle("get-store-value", (_, key: string, defaultValue: unknown) => {
	return store.get(key, defaultValue);
});

// IPC 통신 설정: 스토어 값 저장하기
ipcMain.on("set-store-value", (_, key: string, value: unknown) => {
	store.set(key, value);
});

// 앱이 준비되면 메인 윈도우 생성
app.on("ready", createMainWindow);

// 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// macOS에서 앱 아이콘 클릭 시 창이 없으면 새로 생성
app.on("activate", () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});
