//src/pages/MyPage/index.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SemesterModal from "./components/SemesterChange";
import type { UserInfo } from "../../types/login/login-inform";
import { useSetRecoilState } from "recoil";
import { semesterAtom } from "../../store/atom";
import type { MypageInform } from "../../types/mypage/mypage-inform";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
margin-top: 4rem;
	  margin-left: 2rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bgCard};
  width: 76.9133vw;
  border-radius: 15px;
  height: 11.2828vw;
  margin-bottom: 1.5vw;
`;

const SectionTitle = styled.div`
  color: #fff;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  margin: 1.5vw 0 1.5vw 1.5vw;
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;

const Line = styled.div`
  width: 73.8625vw;
  margin: 0 auto;
  background:#3a3b47;
  height: 1px;
`;

const Information = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  `;

const OpenModalButton = styled.button`
border: none;
 width: 20vw;
  height: 1.8vw;
  text-align: center;
  background: ${(props) => props.theme.color.bgDefault};
  color: #fff;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;

const ArrownandItem = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1.5vw;
`;

const MenuItem1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 14vw;
  margin-left: 1.5vw;
  background: none;
  border: none;
  color: #fff;
  margin-top: 1.5vw;
  cursor: pointer;


`;
const MenuItem2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12vw;
margin-left: 1.5vw;
  background: none;
  border: none;
  color: #fff;
  margin-top: 1.2vw;
  cursor: pointer;

`;
const MenuItem4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8vw;
margin-left: 1.5vw;
  background: none;
  border: none;
  color: #fff;
  margin-top: 1.2vw;
  cursor: pointer;

`;

const MenuItem3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6vw;
margin-left: 1.5vw;
  background: none;
  border: none;
  color: #fff;
  margin-top: 1.2vw;
  cursor: pointer;


`;

const Arrow = styled.div`
  color: #fff;
  font-size: 1.3rem;
`;

const Nameandseme = styled.div`
width: auto;
color: #FFFFFF;
font-size: ${(props) => props.theme.typography.title.fontSize};
font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;
const isElectron = () => {
	return window.electronAPI !== undefined;
};

export default function MenuBar() {
	const navigate = useNavigate();
	const [showSemesterModal, setShowSemesterModal] = useState(false);
	const [user, setUser] = useState<any>(null);
	const setSemster = useSetRecoilState(semesterAtom);
	const [userInfo, setUserInfo] = useState<MypageInform>({
		studentName: "이름 없음",
		semester: 1,
	});

	// 기존 useEffect 부분을 다음과 같이 수정
	useEffect(() => {
		const loadUserInfo = async () => {
			try {
				// 로컬에서 사용자 정보 불러오기
				let userData;
				let userInfoData;

				if (isElectron()) {
					userData = await window.electronAPI.getStoreValue("user");
					userInfoData = await window.electronAPI.getStoreValue("userInfo");
					console.log("userData", userInfoData);
				} else {
					const stored = localStorage.getItem("user");
					const storedInfo = localStorage.getItem("userInfo");
					userData = stored ? JSON.parse(stored) : null;
					userInfoData = storedInfo ? JSON.parse(storedInfo) : null;
				}

				setUser(userData);

				// 서버에서 최신 정보 가져오기 (googleId로만)
				const serverUrl = import.meta.env.VITE_SERVER_URL;
				if (serverUrl && userData?.googleId) {
					try {
						const response = await axios.get(
							`${serverUrl}/user/info/${userData.googleId}`,
						);
						console.log("API 응답:", response.data);

						if (response.data) {
							// API 응답 형식에 맞게 데이터 매핑
							setUserInfo({
								studentName: response.data.userName || "이름 없음", // userName 필드 사용
								semester: response.data.userSemester || 1, // userSemester 필드 사용
							});
							setSemster(response.data.userSemester || 1); // userSemester 필드 사용

							// 서버 데이터로 로컬 업데이트 (API 응답 형식에 맞게 조정)
							const updatedUserInfo = {
								...userData,
								name: response.data.userName, // 기존 코드와의 호환성 위해 name으로도 저장
								userNickname: response.data.userNickname,
								currentSemester: response.data.userSemester, // 기존 코드와의 호환성 위해 currentSemester로도 저장
								userSemester: response.data.userSemester,
								email: response.data.email,
								googleId: response.data.googleId,
							};

							if (isElectron()) {
								await window.electronAPI.setStoreValue(
									"userInfo",
									updatedUserInfo,
								);
							} else {
								localStorage.setItem(
									"userInfo",
									JSON.stringify(updatedUserInfo),
								);
							}
						}
					} catch (error) {
						console.error("서버에서 정보 가져오기 실패:", error);
						// 로컬 데이터 사용
						if (userInfoData) {
							// 로컬 데이터도 새로운 필드명으로 확인
							const semester =
								userInfoData.userSemester || userInfoData.currentSemester || 1;
							const name =
								userInfoData.userName || userInfoData.name || "이름 없음";

							setUserInfo({
								studentName: name,
								semester: semester,
							});
							setSemster(semester);
						}
					}
				} else {
					// 서버 없거나 실패 시 로컬 데이터 사용
					if (userInfoData) {
						// 로컬 데이터도 새로운 필드명으로 확인
						const semester =
							userInfoData.userSemester || userInfoData.currentSemester || 1;
						const name =
							userInfoData.userName || userInfoData.name || "이름 없음";

						setUserInfo({
							studentName: name,
							semester: semester,
						});
						setSemster(semester);
					}
				}
			} catch (error) {
				console.error("사용자 정보 로드 실패:", error);
			}
		};

		loadUserInfo();
	}, [setSemster]);
	const handleSemesterUpdate = async (newSemester: number) => {
		try {
			// 로컬 데이터 업데이트
			let currentUserInfo;
			if (isElectron()) {
				currentUserInfo = await window.electronAPI.getStoreValue("userInfo");
			} else {
				const storedInfo = localStorage.getItem("userInfo");
				currentUserInfo = storedInfo ? JSON.parse(storedInfo) : {};
			}

			const updatedUserInfo = {
				...currentUserInfo,
				currentSemester: newSemester, // 기존 호환성을 위해 유지
				userSemester: newSemester, // 새로운 API 스펙에 맞게 추가
			};

			// 로컬 저장
			if (isElectron()) {
				await window.electronAPI.setStoreValue("userInfo", updatedUserInfo);
				await window.electronAPI.setStoreValue(
					`userInfo_${user.googleId}`,
					updatedUserInfo,
				);
			} else {
				localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
				localStorage.setItem(
					`userInfo_${user.googleId}`,
					JSON.stringify(updatedUserInfo),
				);
			}

			// 서버 업데이트 (API 스펙에 맞게 수정)
			const serverUrl = import.meta.env.VITE_SERVER_URL;
			if (serverUrl && user?.googleId) {
				try {
					await axios.put(
						`${serverUrl}/user/info/${user.googleId}?semester=${newSemester}`,
						{},
						{
							headers: {
								"Content-Type": "application/json",
							},
						},
					);
					console.log("서버에 학기 정보 업데이트 완료");
				} catch (error) {
					console.error("서버에 학기 정보 업데이트 실패:", error);
				}
			}

			// UI 상태 업데이트
			setUserInfo({ ...userInfo, semester: newSemester });
			setSemster(newSemester);
			setShowSemesterModal(false);
		} catch (error) {
			console.error("학기 정보 업데이트 실패:", error);
		}
	};
	// 3. MyPage.tsx 수정 - 로그아웃
	const handleLogout = async () => {
		try {
			if (isElectron()) {
				await window.electronAPI.removeStoreValue("user");
				await window.electronAPI.removeStoreValue("userInfo");
				// userInfo_${googleId}는 유지 (다시 로그인 시 복원용)
			} else {
				localStorage.removeItem("user");
				localStorage.removeItem("userInfo");
				// userInfo_${googleId}는 유지
			}
			navigate("/login");
		} catch (error) {
			console.error("로그아웃 중 오류 발생:", error);
			navigate("/login");
		}
	};

	// 4. MyPage.tsx 수정 - 탈퇴하기
	const handleDeleteAccount = async () => {
		if (!window.confirm("정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.")) {
			return;
		}

		if (user?.googleId) {
			// 서버에서 삭제 시도
			const serverUrl = import.meta.env.VITE_SERVER_URL;
			if (serverUrl) {
				try {
					await axios.delete(`${serverUrl}/user/${user.googleId}`);
					console.log("서버에서 계정 삭제 완료");
				} catch (error) {
					console.error("서버에서 계정 삭제 실패:", error);
					// 서버 삭제 실패해도 로컬은 삭제 진행
				}
			}

			// 로컬 데이터 모두 삭제
			if (isElectron()) {
				await window.electronAPI.removeStoreValue("user");
				await window.electronAPI.removeStoreValue("userInfo");
				await window.electronAPI.removeStoreValue(`userInfo_${user.googleId}`);
			} else {
				localStorage.removeItem("user");
				localStorage.removeItem("userInfo");
				localStorage.removeItem(`userInfo_${user.googleId}`);
			}

			alert("탈퇴가 완료되었습니다.");
			navigate("/login");
		}
	};
	const handleClearCache = async () => {
		// 확인 팝업 표시
		if (
			!window.confirm(
				"데이터 및 캐시를 초기화하시겠습니까?\n로그인 상태는 유지됩니다.",
			)
		) {
			return;
		}

		try {
			// 로딩 상태 표시 (필요 시 상태 추가)
			// setIsLoading(true);

			// 로그인 정보 백업
			let userData;
			if (isElectron()) {
				userData = await window.electronAPI.getStoreValue("user");
			} else {
				const stored = localStorage.getItem("user");
				userData = stored ? JSON.parse(stored) : null;
			}

			if (!userData || !userData.googleId) {
				alert("로그인 정보를 찾을 수 없습니다.");
				navigate("/login");
				return;
			}

			// 서버에 캐시 초기화 요청 (필요한 경우)
			const serverUrl = import.meta.env.VITE_SERVER_URL;
			if (serverUrl) {
				try {
					// 서버 API에 캐시 초기화 요청
					//안되면 delete로 바꿔야함
					// 서버에 캐시 초기화 요청 - DELETE 메서드 사용
					const serverUrl = import.meta.env.VITE_SERVER_URL;
					if (serverUrl) {
						try {
							// 서버 API에 캐시 초기화 요청 (DELETE 메서드)
							await axios.delete(
								`${serverUrl}/user/cache/${userData.googleId}`,
								{
									headers: {
										"Content-Type": "application/json",
									},
								},
							);
							console.log("서버 캐시 초기화 요청 성공");
						} catch (error) {
							console.error("서버 캐시 초기화 요청 실패:", error);
							// 서버 초기화 실패해도 로컬 초기화는 진행
						}
					}
					console.log("서버 캐시 초기화 요청 성공");
				} catch (error) {
					console.error("서버 캐시 초기화 요청 실패:", error);
					// 서버 초기화 실패해도 로컬 초기화는 진행
				}
			}

			// 로컬 캐시 데이터 삭제
			if (isElectron()) {
				// 사용자 정보 삭제
				await window.electronAPI.removeStoreValue("userInfo");
				await window.electronAPI.removeStoreValue(
					`userInfo_${userData.googleId}`,
				);

				// 필요한 경우 추가 캐시 삭제
				await window.electronAPI.removeStoreValue("courseHistory");
				await window.electronAPI.removeStoreValue("curriculum");
				await window.electronAPI.removeStoreValue("roadmap");
				// 기타 필요한 캐시 삭제...
			} else {
				// 사용자 정보 삭제
				localStorage.removeItem("userInfo");
				localStorage.removeItem(`userInfo_${userData.googleId}`);

				// 필요한 경우 추가 캐시 삭제
				localStorage.removeItem("courseHistory");
				localStorage.removeItem("curriculum");
				localStorage.removeItem("roadmap");
				// 기타 필요한 캐시 삭제...
			}

			// 성공 팝업 표시
			alert(
				"데이터 및 캐시가 성공적으로 초기화되었습니다. 페이지가 다시 로드됩니다.",
			);
			console.log("데이터 및 캐시 초기화 완료");

			// 페이지 리로드 - 서버에서 데이터를 다시 가져오게 됨
			window.location.reload();
		} catch (error) {
			console.error("캐시 초기화 중 오류 발생:", error);
			alert("캐시 초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
		} finally {
			// 로딩 상태 해제 (필요 시)
			// setIsLoading(false);
		}
	};
	return (
		<Container>
			<Section>
				<SectionTitle>사용자 정보 관리</SectionTitle>
				<Line />
				<Information>
					<Nameandseme>이름 {userInfo.studentName}</Nameandseme>
					<Nameandseme style={{ paddingLeft: "20vw" }}>현재 학기</Nameandseme>
					<Nameandseme style={{ paddingLeft: "3vw" }}>
						{userInfo.semester}학기
					</Nameandseme>
					<OpenModalButton
						style={{ marginLeft: "5vw" }}
						onClick={() => setShowSemesterModal(true)}
					>
						현재 학기 수정하기
					</OpenModalButton>
				</Information>
			</Section>

			{/* <Section>
				<SectionTitle>사용자 정보 관리</SectionTitle>
				<Line />
				<ArrownandItem>
					<MenuItem1 onClick={handleClearCache}>
						데이터 및 캐시 초기화 하기
						<Arrow>›</Arrow>
					</MenuItem1>
				</ArrownandItem>
			</Section> */}

			<Section>
				<SectionTitle>사용자 정보 관리</SectionTitle>
				<Line />
				<ArrownandItem>
					<MenuItem4 onClick={() => console.log("이용약관 보기")}>
						이용약관 보기
						<Arrow>›</Arrow>
					</MenuItem4>
				</ArrownandItem>
				<ArrownandItem>
					<MenuItem2 onClick={() => console.log("개인정보 처리방침")}>
						개인정보 처리방침 보기
						<Arrow>›</Arrow>
					</MenuItem2>
				</ArrownandItem>
			</Section>

			<Section>
				<SectionTitle>계정 관리</SectionTitle>
				<Line />
				<ArrownandItem>
					<MenuItem3 onClick={handleDeleteAccount}>
						탈퇴하기
						<Arrow>›</Arrow>
					</MenuItem3>
				</ArrownandItem>
				<ArrownandItem>
					<MenuItem3 onClick={handleLogout}>
						로그아웃
						<Arrow>›</Arrow>
					</MenuItem3>
				</ArrownandItem>
			</Section>

			{/* 학기 수정 모달 */}
			<SemesterModal
				isOpen={showSemesterModal}
				onClose={() => setShowSemesterModal(false)}
				currentSemester={userInfo.semester}
				onSave={handleSemesterUpdate}
			/>
		</Container>
	);
}