// src/pages/GoogleCallback.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CallbackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1E1E25;
  color: white;
  font-size: 1.2rem;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #9BDAC9;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-right: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function GoogleCallback() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleCallback = async () => {
			const searchParams = new URLSearchParams(location.search);
			const code = searchParams.get("code");
			const error = searchParams.get("error");

			if (error) {
				console.error("OAuth error:", error);
				navigate("/login");
				return;
			}

			if (code) {
				try {
					// 클라이언트에서 직접 토큰 교환
					const tokenResponse = await axios.post(
						"https://oauth2.googleapis.com/token",
						{
							code,
							client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
							client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
							redirect_uri: `${window.location.origin}/auth/callback`,
							grant_type: "authorization_code",
						},
					);

					const { access_token } = tokenResponse.data;

					// 사용자 정보 가져오기
					const userResponse = await axios.get(
						"https://www.googleapis.com/oauth2/v2/userinfo",
						{
							headers: { Authorization: `Bearer ${access_token}` },
						},
					);

					const userData = userResponse.data;

					// 필요한 사용자 정보만 추출
					const userInfo = {
						googleId: userData.id,
						email: userData.email,
						name: userData.name,
					};

					// 서버가 있는지 확인
					const serverUrl = import.meta.env.VITE_API_URL;

					if (serverUrl) {
						// 서버가 있을 때 - 서버로 전송
						try {
							const response = await axios.post(
								`${serverUrl}/auth/google-login`,
								userInfo,
								{
									headers: {
										"Content-Type": "application/json",
									},
									timeout: 10000,
								},
							);

							if (response.data.success) {
								// 서버 응답 데이터로 처리
								localStorage.setItem(
									"user",
									JSON.stringify(response.data.user),
								);
							}
						} catch (error) {
							console.error("서버 전송 실패:", error);
							// 서버 전송 실패해도 로컬에 저장
							localStorage.setItem("user", JSON.stringify(userInfo));
						}
					} else {
						// 서버가 없을 때 - 로컬에만 저장
						console.log("서버가 없어 로컬에만 저장합니다");
						localStorage.setItem("user", JSON.stringify(userInfo));
					}

					console.log("로그인 처리 완료");
					navigate("/");
				} catch (error) {
					console.error("OAuth callback error:", error);
					navigate("/login");
				}
			} else {
				navigate("/login");
			}
		};

		handleCallback();
	}, [location, navigate]);

	return (
		<CallbackContainer>
			<LoadingSpinner />
			로그인 처리 중...
		</CallbackContainer>
	);
}
