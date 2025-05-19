// src/types/electron.d.ts
interface ElectronAPI {
    // Store 관련
    getStoreValue: <T>(key: string) => Promise<T>;
    setStoreValue: <T>(key: string, value: T) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>; // 추가
    clearStore: () => Promise<void>; // 전체 스토어 삭제를 위해 추가 (선택사항)

    // Auth 관련
    openGoogleAuth: () => Promise<void>;
    onOAuthSuccess: (callback: (userData: any) => void) => void;
    onOAuthError: (callback: (error: string) => void) => void;
    removeAuthListeners: () => void;
    getAuthToken: () => Promise<string | null>;
    setAuthToken: (token: string | null) => Promise<void>;
    logout: () => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>; // 추가

    // 시스템 정보
    versions: {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    };
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

export {};
