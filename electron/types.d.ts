interface UserData {
    email: string;
    name: string;
    uid: string;
}

interface ElectronAPI {
    getStoreValue: (key: string) => Promise<unknown>;
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;
    logout: () => Promise<void>;
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
