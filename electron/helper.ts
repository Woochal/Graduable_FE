// electron/helpers.ts
import { BrowserWindow } from "electron";
import Store from "electron-store";

//Electron 애플리케이션에서 반복적으로 사용되는 유틸리티 함수와 인터페이스를 정의

// 창 상태를 저장하기 위한 인터페이스 정의
export interface WindowState {
	width: number;
	height: number;
	x?: number;
	y?: number;
}

// Store 타입 정의 (electron-store 패키지 사용)
//type ElectronStore = Store<{ [key: string]: WindowState }>;

// 창 생성 유틸리티 함수
export function createWindow(
	windowName: string,
	options: Electron.BrowserWindowConstructorOptions,
): BrowserWindow {
	// 창 상태를 저장할 키
	const key = "window-state";

	// Store 인스턴스 생성 (특정 창의 상태를 저장)
	const store = new Store<{ [key: string]: WindowState }>({
		name: windowName,
	}) as any;

	// 기본 창 크기 설정
	const defaultSize = {
		width: options.width || 2000,
		height: options.height || 1400,
	};

	// 최소 크기 설정 (옵션에 정의되지 않았을 경우 기본값 사용)
	const minSize = {
		minWidth: options.minWidth || 800, // 원하는 최소 너비
		minHeight: options.minHeight || 600, // 원하는 최소 높이
	};

	// 이전에 저장된 창 상태 불러오기 (없으면 기본값 사용)
	const state = store.get(key) || defaultSize;

	// 창 생성 (저장된 상태와 옵션 병합)
	const win = new BrowserWindow({
		...options,
		...state,
		...minSize,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			...options.webPreferences,
		},
	});

	// 창이 닫힐 때 상태 저장
	win.on("close", () => {
		if (!win.isMaximized()) {
			const bounds = win.getBounds();
			store.set(key, {
				width: bounds.width,
				height: bounds.height,
				x: bounds.x,
				y: bounds.y,
			});
		}
	});

	return win;
}
