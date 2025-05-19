// electron/preload.ts
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

interface ElectronAPI {
    // Store 관련
    getStoreValue: (key: string) => Promise<unknown>;
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;

    // Auth 관련
    logout: () => Promise<void>;
    on: (channel: string, callback: (code: string) => void) => void;

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
    on: (channel: string, callback: (code: string) => void) => {
        ipcRenderer.on(channel, (_event: IpcRendererEvent, code: string) => callback(code));
    },

    // 시스템 정보
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
};

// API 노출
contextBridge.exposeInMainWorld('electronAPI', api);

// 전역 타입 선언을 별도의 .d.ts 파일로 이동
