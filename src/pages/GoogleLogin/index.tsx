// src/pages/GoogleLogin.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Graduate from '../../assets/Logo.png';
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
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            let isLoggedIn;

            if (isElectron()) {
                const user = await window.electronAPI.getStoreValue('user');
                isLoggedIn = !!user;
            } else {
                isLoggedIn = !!localStorage.getItem('user');
            }

            if (isLoggedIn) {
                navigate('/');
            }
        };

        checkAuth();

        // Electron에서 OAuth 결과 수신 대기
        if (isElectron()) {
            window.electronAPI.onOAuthSuccess(async (userData) => {
                await handleUserLogin(userData);
            });

            window.electronAPI.onOAuthError((error) => {
                console.error('OAuth error:', error);
                alert('로그인에 실패했습니다.');
            });

            return () => {
                window.electronAPI.removeAuthListeners();
            };
        }
    }, [navigate]);

    // 1. GoogleLogin.tsx - 서버 체크 추가 (선택적)
    const handleUserLogin = async (userData: any) => {
        try {
            console.log('구글 로그인 성공:', userData);

            const basicUserInfo = {
                googleId: userData.googleId,
                email: userData.email,
                name: userData.name,
            };

            // 1. 로컬에 기본 정보 저장
            await saveLocalUser(basicUserInfo);

            // 2. 먼저 로컬에서 확인
            let existingUserInfo;
            if (isElectron()) {
                existingUserInfo = await window.electronAPI.getStoreValue(`userInfo_${basicUserInfo.googleId}`);
            } else {
                const stored = localStorage.getItem(`userInfo_${basicUserInfo.googleId}`);
                existingUserInfo = stored ? JSON.parse(stored) : null;
            }

            // 3. 로컬에 없고 서버가 있으면 서버에서 확인
            if (!existingUserInfo) {
                const serverUrl = import.meta.env.VITE_API_URL;
                if (serverUrl) {
                    // 서버가 있을 때만
                    try {
                        const response = await axios.get(`${serverUrl}/user/info/${basicUserInfo.googleId}`);

                        if (response.data && response.data.currentSemester) {
                            existingUserInfo = response.data;

                            // 서버에서 가져온 데이터를 로컬에 저장
                            if (isElectron()) {
                                await window.electronAPI.setStoreValue(
                                    `userInfo_${basicUserInfo.googleId}`,
                                    existingUserInfo
                                );
                            } else {
                                localStorage.setItem(
                                    `userInfo_${basicUserInfo.googleId}`,
                                    JSON.stringify(existingUserInfo)
                                );
                            }
                        }
                    } catch (error) {
                        console.log('서버에서 사용자 정보 조회 실패 - 신규 사용자로 처리');
                    }
                }
            }

            // 4. 최종 처리
            if (existingUserInfo) {
                // 기존 사용자
                if (isElectron()) {
                    await window.electronAPI.setStoreValue('userInfo', existingUserInfo);
                } else {
                    localStorage.setItem('userInfo', JSON.stringify(existingUserInfo));
                }
            }
            // 없으면 초기 설정으로 진행

            navigate('/');
        } catch (error) {
            console.error('로그인 처리 실패:', error);
            alert('로그인에 실패했습니다.');
        }
    };

    const saveLocalUser = async (userInfo: any) => {
        if (isElectron()) {
            await window.electronAPI.setStoreValue('user', userInfo);

            // googleId로 이전 설정 확인 (이미 가입했던 사용자인지)
            const savedUserInfo = await window.electronAPI.getStoreValue(`userInfo_${userInfo.googleId}`);
            if (savedUserInfo) {
                await window.electronAPI.setStoreValue('userInfo', savedUserInfo);
            }
        } else {
            localStorage.setItem('user', JSON.stringify(userInfo));

            // googleId로 이전 설정 확인
            const savedUserInfo = localStorage.getItem(`userInfo_${userInfo.googleId}`);
            if (savedUserInfo) {
                localStorage.setItem('userInfo', savedUserInfo);
            }
        }
    };

    const handleGoogleLogin = async () => {
        if (isElectron()) {
            window.electronAPI.openGoogleAuth();
        } else {
            // 웹에서 OAuth 처리
            try {
                const width = 500;
                const height = 600;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;

                const popup = window.open(
                    `https://accounts.google.com/o/oauth2/v2/auth?` +
                        `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&` +
                        `redirect_uri=${window.location.origin}/auth/callback&` +
                        `response_type=code&` +
                        `scope=openid email profile&` +
                        `access_type=offline&` +
                        `prompt=consent`,
                    'google-oauth',
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                const checkInterval = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(checkInterval);
                    }
                }, 1000);
            } catch (error) {
                console.error('OAuth 시작 실패:', error);
            }
        }
    };

    return (
        <LoginContainer>
            <GraduateLogo src={Graduate} />

            <Title>GRADUABLE</Title>
            <Subtitle onClick={handleGoogleLogin}>구글로 로그인 및 회원가입 하기</Subtitle>
        </LoginContainer>
    );
}
