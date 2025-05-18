// src/routes/index.tsx
import type React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../Layout';
import DashboardPage from '../pages/Dashboard/index';
import RoadmapPage from '../pages/Roadmap';
import CourseHistory from '../pages/coursehistory';
import SimulatorPage from '../pages/Simulator';
import CourseHandbookPage from '../pages/CourseHandbook';
import CurriculumPage from '../pages/Curriculum';
import MyPage from '../pages/MyPage';
import GoogleLogin from '../../src/pages/GoogleLogin/index';
// import GoogleCallback from "../../src/pages/GoogleCallback/index";
import InitialSetupFlow from '../../src/components/common/Initialsetup/Initialsetupflow';
import { UserInfo } from '../types/login/login-inform';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

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
            let isLoggedIn = false;
            let user = null;

            if (isElectron()) {
                user = await window.electronAPI.getStoreValue('user');
                isLoggedIn = !!user;
            } else {
                const userStr = localStorage.getItem('user');
                user = userStr ? JSON.parse(userStr) : null;
                isLoggedIn = !!user;
            }

            console.log('로그인 상태:', { isLoggedIn, user }); // 디버깅용

            if (!isLoggedIn) {
                console.log('로그인이 필요합니다.'); // 디버깅용
                setNeedsAuth(true);
                setNeedsSetup(false);
                setIsLoading(false);
                return;
            }

            // 2. 로그인이 되어있다면 초기 설정 상태 확인
            let userInfo = null;
            if (isElectron()) {
                userInfo = await window.electronAPI.getStoreValue('userInfo');
            } else {
                const stored = localStorage.getItem('userInfo');
                userInfo = stored ? JSON.parse(stored) : null;
            }

            console.log('사용자 정보:', userInfo); // 디버깅용

            // 필수 정보 확인
            if (!userInfo || !userInfo.currentSemester || !userInfo.currentSemesterInfo) {
                console.log('초기 설정이 필요합니다.'); // 디버깅용
                setNeedsSetup(true);
                setNeedsAuth(false);
            } else {
                console.log('모든 설정이 완료되었습니다.'); // 디버깅용
                setNeedsSetup(false);
                setNeedsAuth(false);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('상태 확인 오류:', error);
            setNeedsAuth(true);
            setNeedsSetup(false);
            setIsLoading(false);
        }
    };

    const handleSetupComplete = () => {
        setNeedsSetup(false);
        navigate('/');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (needsAuth) {
        console.log('로그인 페이지로 이동합니다.'); // 디버깅용
        return <Navigate to="/login" replace />;
    }

    if (needsSetup) {
        console.log('초기 설정 페이지로 이동합니다.'); // 디버깅용
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
                    <Route path="/course-history" element={<CourseHistory />} />
                    <Route path="/simulator" element={<SimulatorPage />} />
                    <Route path="/course-handbook" element={<CourseHandbookPage />} />
                    <Route path="/curriculum" element={<CurriculumPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Route>

                {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};
