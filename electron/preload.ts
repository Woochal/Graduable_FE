// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

interface OAuthUserData {
    googleId: string;
    email: string;
    name: string;
}

interface ElectronAPI {
    // Store 관련
    getStoreValue: (key: string) => Promise<unknown>;
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;

    // Auth 관련
    openGoogleAuth: () => Promise<void>;
    openGoogleAuthWindow: () => Promise<void>; // 내장 창 방식 추가
    logout: () => Promise<void>;
    onOAuthSuccess: (callback: (data: OAuthUserData) => void) => void;
    onOAuthError: (callback: (error: string) => void) => void;

    // 시스템 정보
    versions: {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    };
}

// 렌더러에서 사용할 Electron API 노출
contextBridge.exposeInMainWorld('electron', {
    // Store 관련
    getStoreValue: (key: string) => ipcRenderer.invoke('get-store-value', key),
    setStoreValue: (key: string, value: unknown) => ipcRenderer.invoke('set-store-value', key, value),
    removeStoreValue: (key: string) => ipcRenderer.invoke('remove-store-value', key),

    // Auth 관련
    openGoogleAuth: () => ipcRenderer.invoke('open-google-auth'),
    openGoogleAuthWindow: () => ipcRenderer.invoke('open-google-auth-window'), // 내장 창 방식 추가
    logout: () => ipcRenderer.invoke('logout'),
    onOAuthSuccess: (callback: (data: OAuthUserData) => void) => {
        ipcRenderer.on('oauth-success', (_: unknown, data: OAuthUserData) => callback(data));
    },
    onOAuthError: (callback: (error: string) => void) => {
        ipcRenderer.on('oauth-error', (_: unknown, error: string) => callback(error));
    },

    // 시스템 정보
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
});

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
