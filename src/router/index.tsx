// src/routes/index.tsx
import type React from "react";
import { useEffect, useState } from "react";
import Layout from "../Layout";
import DashboardPage from "../pages/Dashboard/index";
import RoadmapPage from "../pages/Roadmap";
import CourseHistory from "../pages/coursehistory";
import SimulatorPage from "../pages/Simulator";
import CourseHandbookPage from "../pages/CourseHandbook";
import CurriculumPage from "../pages/Curriculum";
import MyPage from "../pages/MyPage";
import GoogleLogin from "../../src/pages/GoogleLogin/index";
import GoogleCallback from "../../src/pages/GoogleCallback/index";
import InitialSetupFlow from "../../src/components/common/Initialsetup/Initialsetupflow";
import { UserInfo } from "../types/login/login-inform";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useNavigate,
} from "react-router-dom";

// Electron 환경 확인
const isElectron = () => {
	return window.electronAPI !== undefined;
};

// 초기 설정 체크를 위한 컴포넌트
const AuthAndSetupCheck = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [needsAuth, setNeedsAuth] = useState(false);
	const [needsSetup, setNeedsSetup] = useState(false);

	useEffect(() => {
		checkAuthAndSetup();
	}, []);

	const checkAuthAndSetup = async () => {
		try {
			// 1. 먼저 로그인 상태 확인
			let isLoggedIn;
			let user;

			if (isElectron()) {
				user = await window.electronAPI.getStoreValue("user");
				isLoggedIn = !!user;
			} else {
				const userStr = localStorage.getItem("user");
				user = userStr ? JSON.parse(userStr) : null;
				isLoggedIn = !!user;
			}

			if (!isLoggedIn) {
				setNeedsAuth(true);
				setIsLoading(false);
				return;
			}

			// 2. 로그인이 되어있다면 초기 설정 상태 확인
			let userInfo;
			if (isElectron()) {
				userInfo = await window.electronAPI.getStoreValue("userInfo");
			} else {
				const stored = localStorage.getItem("userInfo");
				userInfo = stored ? JSON.parse(stored) : null;
			}

			// 필수 정보 확인
			if (
				!userInfo ||
				!userInfo.currentSemester ||
				!userInfo.currentSemesterInfo
			) {
				// googleId별 로컬 저장된 정보 확인
				if (user?.googleId) {
					let savedUserInfo;
					if (isElectron()) {
						savedUserInfo = await window.electronAPI.getStoreValue(
							`userInfo_${user.googleId}`,
						);
					} else {
						const saved = localStorage.getItem(`userInfo_${user.googleId}`);
						savedUserInfo = saved ? JSON.parse(saved) : null;
					}

					// 로컬에 있는지 확인
					if (
						savedUserInfo?.currentSemester &&
						savedUserInfo.currentSemesterInfo
					) {
						// 로컬에 있으면 복원
						if (isElectron()) {
							await window.electronAPI.setStoreValue("userInfo", savedUserInfo);
						} else {
							localStorage.setItem("userInfo", JSON.stringify(savedUserInfo));
						}
						setNeedsSetup(false);
					} else {
						// 로컬에 없고 서버가 있으면 서버 확인
						const serverUrl = import.meta.env.VITE_API_URL;
						if (serverUrl) {
							// 서버가 있을 때만
							try {
								const response = await axios.get(
									`${serverUrl}/user/info/${user.googleId}`,
								);

								if (response.data?.currentSemester) {
									const serverUserInfo = response.data;

									// 서버 데이터 로컬에 저장
									if (isElectron()) {
										await window.electronAPI.setStoreValue(
											"userInfo",
											serverUserInfo,
										);
										await window.electronAPI.setStoreValue(
											`userInfo_${user.googleId}`,
											serverUserInfo,
										);
									} else {
										localStorage.setItem(
											"userInfo",
											JSON.stringify(serverUserInfo),
										);
										localStorage.setItem(
											`userInfo_${user.googleId}`,
											JSON.stringify(serverUserInfo),
										);
									}
									setNeedsSetup(false);
								} else {
									setNeedsSetup(true);
								}
							} catch (error) {
								console.log("서버 조회 실패 - 초기 설정 필요");
								setNeedsSetup(true);
							}
						} else {
							// 서버 없으면 초기 설정 필요
							setNeedsSetup(true);
						}
					}
				} else {
					setNeedsSetup(true);
				}
			}

			setIsLoading(false);
		} catch (error) {
			console.error("상태 확인 오류:", error);
			setIsLoading(false);
		}
	};

	const handleSetupComplete = () => {
		setNeedsSetup(false);
		navigate("/");
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (needsAuth) {
		return <Navigate to="/login" replace />;
	}

	if (needsSetup) {
		return <InitialSetupFlow onComplete={handleSetupComplete} />;
	}

	return <>{children}</>;
};

export const Routing = () => {
	return (
		<Router>
			<Routes>
				{/* 구글 로그인 페이지 */}
				<Route path="/login" element={<GoogleLogin />} />

				{/* OAuth 콜백 페이지 - 웹 환경에서만 사용 */}
				{!isElectron() && (
					<Route path="/auth/callback" element={<GoogleCallback />} />
				)}

				{/* 보호된 라우트들 with 초기 설정 체크 */}
				<Route
					path="/"
					element={
						<AuthAndSetupCheck>
							<Layout />
						</AuthAndSetupCheck>
					}
				>
					<Route index element={<DashboardPage />} />
					<Route path="/roadmap" element={<RoadmapPage />} />
					<Route path="/history" element={<CourseHistory />} />
					<Route path="/simulator" element={<SimulatorPage />} />
					<Route path="/handbook" element={<CourseHandbookPage />} />
					<Route path="/curriculum" element={<CurriculumPage />} />
					<Route path="/mypage" element={<MyPage />} />
				</Route>

				{/* 기본 경로는 로그인 페이지로 리다이렉트 */}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Router>
	);
};
