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
// import GoogleCallback from "../../src/pages/GoogleCallback/index";
import InitialSetupFlow from "../../src/components/common/Initialsetup/Initialsetupflow";

import axios from "axios";
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

			// 로컬 userInfo 디버깅
			console.log("로컬 userInfo:", userInfo);

			// 필수 정보 확인 - userSemester 또는 currentSemester 중 하나라도 있으면 됨
			const hasSemesterInfo =
				userInfo && (userInfo.userSemester || userInfo.currentSemester);

			if (!hasSemesterInfo) {
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

					console.log("로컬 저장된 사용자별 정보:", savedUserInfo);

					// 로컬에 저장된 정보가 있는지 확인 - userSemester 또는 currentSemester 확인
					if (
						savedUserInfo &&
						(savedUserInfo.userSemester || savedUserInfo.currentSemester)
					) {
						// 기존 코드와의 호환성을 위해 필드 동기화
						const updatedUserInfo = {
							...savedUserInfo,
							currentSemester:
								savedUserInfo.userSemester || savedUserInfo.currentSemester,
							userSemester:
								savedUserInfo.currentSemester || savedUserInfo.userSemester,
							// currentSemesterInfo가 없으면 빈 객체로 초기화
							currentSemesterInfo: savedUserInfo.currentSemesterInfo || {},
						};

						// 로컬에 있으면 복원
						if (isElectron()) {
							await window.electronAPI.setStoreValue(
								"userInfo",
								updatedUserInfo,
							);
						} else {
							localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
						}
						setNeedsSetup(false);
						console.log("로컬에서 사용자 정보 복원 성공");
					} else {
						// 로컬에 없고 서버가 있으면 서버 확인
						const serverUrl = import.meta.env.VITE_SERVER_URL;
						if (serverUrl) {
							// 서버가 있을 때만
							try {
								console.log(
									"서버에 요청:",
									`${serverUrl}/user/info/${user.googleId}`,
								);
								const response = await axios.get(
									`${serverUrl}/user/info/${user.googleId}`,
								);

								console.log("서버 응답 전체:", response);
								console.log("서버 응답 데이터:", response.data);

								// userSemester 또는 currentSemester 중 하나라도 있으면 정보가 있는 것으로 간주
								if (
									response.data &&
									(response.data.userSemester !== undefined ||
										response.data.currentSemester !== undefined)
								) {
									// 서버 데이터를 로컬 형식에 맞게 변환
									const serverUserInfo = {
										...response.data,
										// 기존 코드와의 호환성을 위해 필드 동기화
										currentSemester:
											response.data.userSemester ||
											response.data.currentSemester ||
											1,
										userSemester:
											response.data.currentSemester ||
											response.data.userSemester ||
											1,
										// currentSemesterInfo가 없으면 생성
										currentSemesterInfo:
											response.data.currentSemesterInfo || {},
									};

									console.log("저장할 사용자 정보:", serverUserInfo);

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
									console.log("서버에서 사용자 정보 가져오기 성공");
								} else {
									console.log("서버에서 필수 정보(학기) 누락 - 초기 설정 필요");
									setNeedsSetup(true);
								}
							} catch (error) {
								console.log("서버 조회 실패 - 초기 설정 필요:", error);
								setNeedsSetup(true);
							}
						} else {
							// 서버 없으면 초기 설정 필요
							console.log("서버 URL이 없음 - 초기 설정 필요");
							setNeedsSetup(true);
						}
					}
				} else {
					console.log("GoogleId 없음 - 초기 설정 필요");
					setNeedsSetup(true);
				}
			} else {
				console.log("로컬에 사용자 정보 존재 - 초기 설정 불필요");
				setNeedsSetup(false);
			}

			setIsLoading(false);
		} catch (error) {
			console.error("상태 확인 오류:", error);
			setIsLoading(false);
			setNeedsSetup(true); // 오류 발생 시 안전하게 초기 설정으로
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

				{/* OAuth 콜백 페이지 - 웹 환경에서만 사용
				{!isElectron() && (
					<Route path="/auth/callback" element={<GoogleCallback />} />
				)} */}

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
