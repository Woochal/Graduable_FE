import { isElectron } from "../utils/electron";

// 개발 환경인지 확인
const isDev = () => {
	return process.env.NODE_ENV === "development" || !isElectron();
};

export const KAKAO_CONFIG = {
	JAVASCRIPT_KEY: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
	REST_API_KEY: import.meta.env.VITE_KAKAO_REST_API_KEY,
	REDIRECT_URI: isDev()
		? "http://localhost:5173/auth"
		: "http://localhost/auth",
	SCOPE: "profile_nickname,account_email",
};

// 카카오 SDK 타입 정의
interface KakaoSDK {
	init: (key: string) => void;
	isInitialized: () => boolean;
	Auth: {
		authorize: (options: { redirectUri: string; scope: string }) => void;
	};
	API: {
		request: (options: {
			url: string;
			success: (res: any) => void;
			fail: (err: any) => void;
		}) => void;
	};
}

// 카카오 SDK 초기화
declare global {
	interface Window {
		Kakao: KakaoSDK;
	}
}

export const initKakao = () => {
	if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
		window.Kakao.init(KAKAO_CONFIG.JAVASCRIPT_KEY);
	}
};
