// electron-store.d.ts
declare module "electron-store" {
	export interface Options<T> {
		name?: string;
		cwd?: string;
		encryptionKey?: string | Buffer;
		fileExtension?: string;
		clearInvalidConfig?: boolean;
		serialize?: (value: T) => string;
		deserialize?: (value: string) => T;
		defaults?: Partial<T>;
		watch?: boolean;
	}

	export default class Store<T = Record<string, unknown>> {
		constructor(options?: Options<T>);

		// get 메서드 오버로드
		get<K extends keyof T>(key: K): T[K];
		get<K extends keyof T, U>(key: K, defaultValue: U): T[K] | U;
		get(key: string): unknown;
		get(key: string, defaultValue: unknown): unknown;

		// set 메서드 오버로드
		set<K extends keyof T>(key: K, value: T[K]): void;
		set(key: string, value: unknown): void;
		set(object: Partial<T>): void;

		// 다른 메서드들
		has(key: string): boolean;
		delete(key: string): void;
		clear(): void;
		onDidChange<K extends keyof T>(
			key: K,
			callback: (newValue: T[K], oldValue: T[K]) => void,
		): () => void;
		onDidAnyChange(callback: (newValue: T, oldValue: T) => void): () => void;
		size: number;
		path: string;
		store: T;
	}
}
