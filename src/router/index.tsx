// src/router/index.tsx
import type React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../Layout';
import DashboardPage from '../pages/Dashboard/index';
import RoadmapPage from '../pages/Roadmap';
import CourseHistory from '../pages/CourseHistory';
import SimulatorPage from '../pages/Simulator';
import CourseHandbookPage from '../pages/CourseHandbook';
import CurriculumPage from '../pages/Curriculum';
import MyPage from '../pages/MyPage';
import GoogleLogin from '../../src/pages/GoogleLogin/index';
// import GoogleCallback from "../../src/pages/GoogleCallback/index";
import InitialSetupFlow from '../../src/components/common/Initialsetup/Initialsetupflow';
import { UserInfo } from '../types/login/login-inform';
import { userDataRecoil } from '../atom/UserAtom';
import { useRecoilState } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Electron 환경 확인
const isElectron = () => {
    return window.electronAPI !== undefined;
};

// 초기 설정 체크를 위한 컴포넌트
const AuthAndSetupCheck = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export const Routing = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/login" element={<GoogleLogin />} />
                <Route path="/auth" element={<GoogleLogin />} />

                {/* 보호된 라우트들 */}
                <Route
                    element={
                        <AuthAndSetupCheck>
                            <Layout />
                        </AuthAndSetupCheck>
                    }
                >
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="roadmap" element={<RoadmapPage />} />
                    <Route path="history" element={<CourseHistory />} />
                    <Route path="simulator" element={<SimulatorPage />} />
                    <Route path="handbook" element={<CourseHandbookPage />} />
                    <Route path="curriculum" element={<CurriculumPage />} />
                    <Route path="mypage" element={<MyPage />} />
                </Route>

                {/* 잘못된 경로는 대시보드로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};
