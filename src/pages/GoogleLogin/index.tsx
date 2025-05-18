// src/pages/GoogleLogin.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Graduate from '../../assets/Logo.png';
import { KAKAO_CONFIG, initKakao } from '../../lib/kakao';

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
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

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
        initKakao();

        // URL에서 인증 코드 확인
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            console.log('Auth code found in URL:', code);
            handleKakaoCallback(code);
        }
    }, [navigate, location]);

    const handleKakaoCallback = async (code: string) => {
        try {
            console.log('Starting Kakao callback handling with code:', code);
            const tokenResponse = await axios.post(
                'https://kauth.kakao.com/oauth/token',
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: KAKAO_CONFIG.REST_API_KEY,
                    redirect_uri: KAKAO_CONFIG.REDIRECT_URI,
                    code: code,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                }
            );

            console.log('Token response received:', tokenResponse.data);
            const accessToken = tokenResponse.data.access_token;

            const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('User info received:', userInfoResponse.data);
            const userInfo = userInfoResponse.data;

            const userData = {
                googleId: userInfo.id.toString(),
                email: userInfo.kakao_account.email,
                name: userInfo.properties.nickname,
            };

            console.log('Processing user login with info:', userData);
            await handleUserLogin(userData);
        } catch (error) {
            console.error('Kakao login failed:', error);
            if (axios.isAxiosError(error) && error.response?.data?.error_description) {
                console.error('Kakao error:', error.response.data.error_description);
            }
            // 로그인 실패 메시지는 handleUserLogin에서만 표시
        }
    };

    const handleUserLogin = async (userData: { googleId: string; email: string; name: string }) => {
        try {
            console.log('Starting user login process:', userData);
            // 로컬 스토리지에 사용자 정보 저장
            console.log('Saving user info to local storage');
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('User info saved to localStorage');

            // 기존 사용자 정보 확인
            const existingUserInfo = localStorage.getItem(`userInfo_${userData.googleId}`);
            console.log('Existing user info from localStorage:', existingUserInfo);

            if (!existingUserInfo) {
                try {
                    console.log('Fetching user info from server');
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/info/${userData.googleId}`);
                    if (response.data) {
                        localStorage.setItem(`userInfo_${userData.googleId}`, JSON.stringify(response.data));
                        console.log('User info saved from server:', response.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user info from server:', error);
                    console.log('No existing user info found, proceeding as new user');
                }
            }

            console.log('Login process completed, navigating to home');
            navigate('/');
        } catch (error) {
            console.error('Login process failed:', error);
            setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleKakaoLogin = () => {
        try {
            setIsLoading(true);
            console.log('Starting Kakao login with redirect URI:', KAKAO_CONFIG.REDIRECT_URI);
            window.Kakao.Auth.authorize({
                redirectUri: KAKAO_CONFIG.REDIRECT_URI,
                scope: KAKAO_CONFIG.SCOPE,
            });
        } catch (error) {
            console.error('Kakao login failed:', error);
            alert('로그인에 실패했습니다.');
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
