interface OAuthUserData {
    googleId: string;
    email: string;
    name: string;
}

interface ElectronAPI {
    getStoreValue: (key: string) => Promise<unknown>;
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;
    openGoogleAuth: () => Promise<void>;
    logout: () => Promise<void>;
    onOAuthSuccess: (callback: (data: OAuthUserData) => void) => void;
    onOAuthError: (callback: (error: string) => void) => void;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
