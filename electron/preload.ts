// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";

interface ElectronAPI {
	// Store 관련
	getStoreValue: <T>(key: string) => Promise<T>;
	setStoreValue: <T>(key: string, value: T) => Promise<void>;
	removeStoreValue: (key: string) => Promise<void>; // 추가
	// Auth 관련
	openGoogleAuth: () => Promise<void>;
	onOAuthSuccess: (callback: (userData: any) => void) => void;
	onOAuthError: (callback: (error: string) => void) => void;
	removeAuthListeners: () => void;
	logout: () => Promise<void>;

	// 시스템 정보
	versions: {
		node: () => string;
		chrome: () => string;
		electron: () => string;
	};
}

// 렌더러에서 사용할 Electron API 노출
contextBridge.exposeInMainWorld("electronAPI", {
	// Store 관련
	getStoreValue: <T>(key: string) => ipcRenderer.invoke("get-store-value", key),

	setStoreValue: <T>(key: string, value: T) =>
		ipcRenderer.invoke("set-store-value", key, value),
	removeStoreValue: (key: string) =>
		ipcRenderer.invoke("remove-store-value", key), // 추가
	// Auth 관련
	openGoogleAuth: () => ipcRenderer.invoke("open-google-auth"),

	onOAuthSuccess: (callback: (userData: any) => void) => {
		ipcRenderer.on("oauth-success", (_, userData) => callback(userData));
	},

	onOAuthError: (callback: (error: string) => void) => {
		ipcRenderer.on("oauth-error", (_, error) => callback(error));
	},

	removeAuthListeners: () => {
		ipcRenderer.removeAllListeners("oauth-success");
		ipcRenderer.removeAllListeners("oauth-error");
	},

	logout: () => ipcRenderer.invoke("logout"),

	// 시스템 정보
	versions: {
		node: () => process.versions.node,
		chrome: () => process.versions.chrome,
		electron: () => process.versions.electron,
	},
} as ElectronAPI);

declare global {
	interface Window {
		electronAPI: ElectronAPI;
	}
}
