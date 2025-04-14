// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";
/*
main.ts에서 BrowserWindow 생성 시 preload 옵션으로 지정되어, 렌더러 프로세스가 로드되기 전에 실행
*/

// 메인 프로세스와 렌더러 프로세스 간의 안전한 통신을 위한 API 노출
contextBridge.exposeInMainWorld("electronAPI", {
	// 스토어 관련 함수
	getStoreValue: <T>(key: string, defaultValue: T) =>
		ipcRenderer.invoke("get-store-value", key, defaultValue),

	setStoreValue: <T>(key: string, value: T) =>
		ipcRenderer.send("set-store-value", key, value),

	// 시스템 정보
	versions: {
		node: () => process.versions.node,
		chrome: () => process.versions.chrome,
		electron: () => process.versions.electron,
	},
});
