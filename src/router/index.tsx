// src/router/index.tsx
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
import { UserInfo } from "../types/login/login-inform";
import { userDataRecoil } from "../atom/UserAtom";
import { useRecoilState } from "recoil";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useNavigate,
} from "react-router-dom";
import axios from "axios";

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
    const [userData, setUserData] = useRecoilState(userDataRecoil);

	useEffect(() => {
		checkAuthAndSetup();
	}, []);
	const checkAuthAndSetup = async () => {
		try {
			// 1. 먼저 로그인 상태 확인
			let isLoggedIn = false;
			let user = null;

			if (isElectron()) {
				user = await window.electronAPI.getStoreValue("user");
				isLoggedIn = !!user;
			} else {
				const userStr = localStorage.getItem("user");
				user = userStr ? JSON.parse(userStr) : null;
				isLoggedIn = !!user;
			}

			console.log("로그인 상태:", { isLoggedIn, user });

			if (!isLoggedIn || !user || !user.googleId) {
				console.log("로그인이 필요합니다.");
				setNeedsAuth(true);
				setNeedsSetup(false);
				setIsLoading(false);
				return;
			}

			// 2. 로그인이 되어있다면 서버에서 최신 사용자 정보 가져오기 (항상 서버 우선)
			let userInfo = null;
			let serverRequestSuccessful = false;
			let serverUserExists = false;

			// 항상 서버에서 최신 데이터 가져오기 시도
			if (user?.googleId) {
				try {
					const serverUrl = import.meta.env.VITE_SERVER_URL;
					if (serverUrl) {
						console.log("서버에서 최신 사용자 정보를 조회합니다...");
						const response = await axios.get(
							`${serverUrl}/user/info/${user.googleId}`,
							{
								timeout: 5000, // 타임아웃 설정
							},
						);

						serverRequestSuccessful = true;

						// 서버 응답 데이터가 있고 유효한지 확인
						if (response.data) {
							// 서버에서 반환된 데이터에 필수 필드가 있는지 확인
							if (response.data.googleId) {
								console.log(
									"서버에서 사용자 정보를 성공적으로 가져왔습니다:",
									response.data,
								);
								userInfo = response.data;
                                setUserData(response.data)
								serverUserExists = true;

								// 서버 데이터를 로컬에 저장 (덮어쓰기)
								if (isElectron()) {
									await window.electronAPI.setStoreValue("userInfo", userInfo);
									await window.electronAPI.setStoreValue(
										`userInfo_${user.googleId}`,
										userInfo,
									);
								} else {
									localStorage.setItem("userInfo", JSON.stringify(userInfo));
									localStorage.setItem(
										`userInfo_${user.googleId}`,
										JSON.stringify(userInfo),
									);
								}
							} else {
								console.log(
									"서버에서 가져온 사용자 정보가 유효하지 않습니다 (googleId 없음)",
								);
								serverUserExists = false;
							}
						} else {
							console.log("서버 응답은 성공했지만 데이터가 비어있습니다");
							serverUserExists = false;
						}
					}
				} catch (error) {
					serverRequestSuccessful = false;
					serverUserExists = false;

					// 오류 응답 분석
					if (error.response) {
						// 서버가 응답을 반환했지만 오류 상태 코드가 있음
						console.error(
							`서버 오류 응답 (${error.response.status}):`,
							error.response.data,
						);

						// 404 오류는 사용자가 서버에 없음을 의미 (탈퇴했거나 삭제됨)
						if (error.response.status === 404) {
							console.log(
								"서버에서 사용자를 찾을 수 없습니다 (탈퇴했거나 삭제됨)",
							);

							// 로컬 데이터 삭제 후 로그인 화면으로 이동
							if (isElectron()) {
								await window.electronAPI.removeStoreValue("user");
								await window.electronAPI.removeStoreValue("userInfo");
								await window.electronAPI.removeStoreValue(
									`userInfo_${user.googleId}`,
								);
							} else {
								localStorage.removeItem("user");
								localStorage.removeItem("userInfo");
								localStorage.removeItem(`userInfo_${user.googleId}`);
							}

							setNeedsAuth(true);
							setNeedsSetup(false);
							setIsLoading(false);
							return;
						}
					} else if (error.request) {
						// 요청은 만들어졌지만 응답이 없음 (네트워크 오류)
						console.error("서버 응답 없음 (네트워크 오류):", error.request);
					} else {
						// 요청 설정 중 오류 발생
						console.error("요청 설정 오류:", error.message);
					}

					// 서버 조회 실패 시에만 로컬 데이터 사용
					console.log("로컬 저장소에서 사용자 정보를 확인합니다...");
					if (isElectron()) {
						userInfo = await window.electronAPI.getStoreValue("userInfo");
					} else {
						const stored = localStorage.getItem("userInfo");
						userInfo = stored ? JSON.parse(stored) : null;
					}
				}
			}

			console.log("최종 사용자 정보:", userInfo);

			// 3. 사용자 정보 유효성 검사
			if (!userInfo || !userInfo.userSemester) {
				console.log(
					"초기 설정이 필요합니다. 사용자 정보 부족:",
					"유저정보 존재:",
					!!userInfo,
					"학기정보 존재:",
					userInfo?.userSemester,
				);

				// 서버 요청이 성공했지만 사용자가 없는 경우 (탈퇴 후 재로그인)
				if (serverRequestSuccessful && !serverUserExists) {
					console.log("서버에 사용자가 없습니다. 로그인 페이지로 이동합니다.");

					// 로컬 데이터 삭제
					if (isElectron()) {
						await window.electronAPI.removeStoreValue("user");
						await window.electronAPI.removeStoreValue("userInfo");
						await window.electronAPI.removeStoreValue(
							`userInfo_${user.googleId}`,
						);
					} else {
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						localStorage.removeItem(`userInfo_${user.googleId}`);
					}

					setNeedsAuth(true);
					setNeedsSetup(false);
				} else {
					// 서버 요청이 실패했거나, 성공했지만 설정이 필요한 경우
					setNeedsSetup(true);
					setNeedsAuth(false);
				}
			} else {
				console.log("모든 설정이 완료되었습니다. 메인 화면으로 이동합니다.");
				console.log("현재 학기:", userInfo.userSemester);
				setNeedsSetup(false);
				setNeedsAuth(false);
			}

			setIsLoading(false);
		} catch (error) {
			console.error("상태 확인 오류:", error);
			console.error("오류 상세:", error.message);
			setNeedsAuth(true);
			setNeedsSetup(false);
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
		console.log("로그인 페이지로 이동합니다.");
		return <Navigate to="/login" replace />;
	}

	if (needsSetup) {
		console.log("초기 설정 페이지로 이동합니다.");
		return <InitialSetupFlow onComplete={handleSetupComplete} />;
	}

	return <>{children}</>;
};

export const Routing = () => {
	return (
		<Router>
			<Routes>
				{/* 로그인 페이지 */}
				<Route path="/login" element={<GoogleLogin />} />

				{/* 카카오 로그인 콜백 */}
				<Route path="/auth" element={<GoogleLogin />} />

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