// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

interface UserData {
    email: string;
    name: string;
    uid: string;
}

interface ElectronAPI {
    // Store 관련
    getStoreValue: (key: string) => Promise<any>;
    setStoreValue: (key: string, value: any) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;

    // Auth 관련
    logout: () => Promise<void>;

    // 시스템 정보
    versions: {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    };
}

// API 정의
const api: ElectronAPI = {
    // 스토어 관련
    getStoreValue: (key: string) => ipcRenderer.invoke('get-store-value', key),
    setStoreValue: (key: string, value: unknown) => ipcRenderer.invoke('set-store-value', key, value),
    removeStoreValue: (key: string) => ipcRenderer.invoke('remove-store-value', key),

    // 로그인 관련
    logout: () => ipcRenderer.invoke('logout'),

    // 시스템 정보
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
};

// API 노출
contextBridge.exposeInMainWorld('electronAPI', api);

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
