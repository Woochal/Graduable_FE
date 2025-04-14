// This file provides TypeScript interfaces for Electron APIs exposed to the renderer

interface ElectronAPI {
	ping: () => Promise<string>;
	// Add more IPC methods as you define them
}

interface Versions {
	node: () => string;
	chrome: () => string;
	electron: () => string;
}

declare global {
	interface Window {
		electronAPI: ElectronAPI;
		versions: Versions;
		getStoreValue: <T>(key: string, defaultValue?: T) => Promise<T>;
		setStoreValue: <T>(key: string, value: T) => void;
	}
}

export {};
