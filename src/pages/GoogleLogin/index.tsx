//src/pages/GoogleLogin/index.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Graduate from "../../assets/Logo.png";
import { KAKAO_CONFIG, initKakao } from "../../lib/kakao";
import { userDataRecoil } from "../../atom/UserAtom";
import { useRecoilState } from "recoil";

const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${(props) => props.theme.color.bgDefault};
`;

const Title = styled.h1`
    color: white;
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: bold;
`;

const Subtitle = styled.button`
    border-radius: 8px;
    border: none;
    width: 371.58px;
    height: 65px;
    background: ${(props) => props.theme.color.bgCard};
    color: #9e9ea4;
    font-size: 1.2rem;
    margin-top: 3rem;
`;

const GraduateLogo = styled.img`
    width: 200.2px;
    height: 139.24px;
`;

const isElectron = () => {
	return window.electronAPI !== undefined;
};

export default function GoogleLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useRecoilState(userDataRecoil);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const checkAuth = async () => {
			let isLoggedIn;

			if (isElectron()) {
				const user = await window.electronAPI.getStoreValue("user");
				console.log("Checking auth in Electron, user:", user);
				isLoggedIn = !!user;

				// store에서 인증 코드 확인
				const authCode = await window.electronAPI.getStoreValue("auth_code");
				console.log("Checking auth code in store:", authCode);

				if (authCode && typeof authCode === "string") {
					console.log("Found auth code in store, starting callback handling");
					await handleKakaoCallback(authCode);
					// 사용 후 삭제
					await window.electronAPI.removeStoreValue("auth_code");
				}
			} else {
				const user = localStorage.getItem("user");
				console.log("Checking auth in Web, user:", user);
				isLoggedIn = !!user;
			}

			if (isLoggedIn) {
				console.log("User is logged in, navigating to main page");
				navigate("/");
			}
		};

		checkAuth();
		initKakao();

		// IPC 이벤트 리스너 등록
		if (isElectron()) {
			console.log("Registering IPC event listener for auth-code");
			// @ts-ignore - electronAPI.on is defined in preload.ts
			window.electronAPI.on("auth-code", async (code: string) => {
				console.log("Received auth code via IPC:", code);
				await handleKakaoCallback(code);
			});
		} else {
			// URL에서 인증 코드 확인 (웹 환경)
			const code = new URLSearchParams(location.search).get("code");
			console.log("Location search:", location.search);
			console.log("Extracted code from URL:", code);

			if (code) {
				console.log("Auth code found in URL, starting callback handling");
				handleKakaoCallback(code);
			}
		}

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			if (isElectron()) {
				// @ts-expect-error - electronAPI 타입 정의에 removeListener가 없어서 추가
				window.electronAPI.removeListener?.("auth-code");
			}
		};
	}, [navigate, location]);

	const handleKakaoCallback = async (code: string) => {
		try {
			console.log("Starting Kakao callback handling with code:", code);

			// 토큰 요청
			console.log("Requesting access token from Kakao...");
			const tokenResponse = await axios.post(
				"https://kauth.kakao.com/oauth/token",
				new URLSearchParams({
					grant_type: "authorization_code",
					client_id: KAKAO_CONFIG.REST_API_KEY,
					redirect_uri: KAKAO_CONFIG.REDIRECT_URI,
					code: code,
				}),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					},
				},
			);

			console.log("Token response received:", tokenResponse.data);
			const accessToken = tokenResponse.data.access_token;

			// 사용자 정보 요청
			console.log("Requesting user info from Kakao...");
			const userInfoResponse = await axios.get(
				"https://kapi.kakao.com/v2/user/me",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);

			console.log("User info received:", userInfoResponse.data);
			const userInfo = userInfoResponse.data;

			if (
				!userInfo.id ||
				!userInfo.kakao_account?.email ||
				!userInfo.properties?.nickname
			) {
				throw new Error("Required user information is missing");
			}

			const userData = {
				googleId: userInfo.id.toString(),
				email: userInfo.kakao_account.email,
				name: userInfo.properties.nickname,
			};

			console.log("Processed user data:", userData);
			await handleUserLogin(userData);
		} catch (error) {
			// 에러 발생 시 조용히 처리
			console.error("Login process error:", error);
		}
	};

	const handleUserLogin = async (userData: {
		googleId: string;
		email: string;
		name: string;
	}) => {
		try {
			console.log("Starting user login process:", userData);

			if (isElectron()) {
				// Electron 환경에서는 electron-store 사용
				console.log("Saving user info to electron-store");
				await window.electronAPI.setStoreValue("user", userData);
				setUserData(userData);

				// 저장 후 바로 확인
				const savedUser = await window.electronAPI.getStoreValue("user");
				console.log("Saved user info in electron-store:", savedUser);

				if (!savedUser) {
					throw new Error("Failed to save user data to electron-store");
				}

				// 사용자 정보 확인 후 페이지 이동
				const storedUserInfo = await window.electronAPI.getStoreValue(
					`userInfo_${userData.googleId}`,
				);
				console.log("Existing user info from electron-store:", storedUserInfo);

				if (storedUserInfo) {
					console.log("User info exists, navigating to main page");
					navigate("/", { replace: true });
				} else {
					console.log("No user info found, navigating to semester page");
					// 서버 연결 실패 시에도 semester 페이지로 이동
					navigate("/semester", { replace: true });
				}

				// 백그라운드에서 사용자 정보 가져오기
				if (!storedUserInfo) {
					try {
						console.log("Fetching user info from server in background");
						const serverUrl = import.meta.env.VITE_SERVER_URL;
						if (serverUrl) {
							const response = await axios.get(
								`${serverUrl}/user/info/${userData.googleId}`,
							);
							if (response.data) {
								console.log("Received user info from server:", response.data);
								await window.electronAPI.setStoreValue(
									`userInfo_${userData.googleId}`,
									response.data,
								);

								// 저장 후 확인
								const savedUserInfo = await window.electronAPI.getStoreValue(
									`userInfo_${userData.googleId}`,
								);
								console.log("Saved user info from server:", savedUserInfo);
							}
						}
					} catch (error) {
						console.error("Failed to fetch user info from server:", error);
						console.log("No existing user info found, proceeding as new user");
						// 서버 연결 실패 시에도 기본 사용자 정보 저장
						await window.electronAPI.setStoreValue(
							`userInfo_${userData.googleId}`,
							{
								...userData,
								isNewUser: true,
							},
						);
					}
				}
			} else {
				// 웹 환경에서는 localStorage 사용
				console.log("Saving user info to localStorage");
				localStorage.setItem("user", JSON.stringify(userData));
				console.log("User info saved to localStorage");

				// 사용자 정보 확인 후 페이지 이동
				const storedUserInfo = localStorage.getItem(
					`userInfo_${userData.googleId}`,
				);
				console.log("Existing user info from localStorage:", storedUserInfo);

				if (storedUserInfo) {
					console.log("User info exists, navigating to main page");
					navigate("/", { replace: true });
				} else {
					console.log("No user info found, navigating to semester page");
					navigate("/semester", { replace: true });
				}

				// 백그라운드에서 사용자 정보 가져오기
				if (!storedUserInfo) {
					try {
						console.log("Fetching user info from server in background");
						const serverUrl = import.meta.env.VITE_SERVER_URL;
						if (serverUrl) {
							const response = await axios.get(
								`${serverUrl}/user/info/${userData.googleId}`,
							);
							if (response.data) {
								localStorage.setItem(
									`userInfo_${userData.googleId}`,
									JSON.stringify(response.data),
								);
								console.log("User info saved from server:", response.data);
							}
						}
					} catch (error) {
						console.error("Failed to fetch user info from server:", error);
						console.log("No existing user info found, proceeding as new user");
					}
				}
			}
		} catch (error) {
			console.error("Login process failed:", error);
			alert("로그인에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const handleKakaoLogin = () => {
		try {
			setIsLoading(true);
			console.log(
				"Starting Kakao login with redirect URI:",
				KAKAO_CONFIG.REDIRECT_URI,
			);
			window.Kakao.Auth.authorize({
				redirectUri: KAKAO_CONFIG.REDIRECT_URI,
				scope: KAKAO_CONFIG.SCOPE,
			});
		} catch (error) {
			console.error("Kakao login failed:", error);
			alert("로그인에 실패했습니다.");
			setIsLoading(false);
		}
	};

	return (
		<LoginContainer>
			<GraduateLogo src={Graduate} />
			<Title>GRADUABLE</Title>
			<Subtitle onClick={handleKakaoLogin} disabled={isLoading}>
				카카오로 로그인 및 회원가입 하기
			</Subtitle>
		</LoginContainer>
	);
}