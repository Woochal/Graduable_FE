// components/InitialSetup/InitialSetupFlow.tsx
import React, { useState } from "react";
import SemesterSelection from "./SemtesterSelection";
import YearSemesterSelection from "./Yearselection";
import GraduationInfo from "./GraduationInfo";
import type { UserInfo, SemesterInfo } from "../../../types/login/login-inform";
import axios from "axios";

interface InitialSetupFlowProps {
	onComplete: () => void;
}

const isElectron = () => {
	return window.electronAPI !== undefined;
};

export default function InitialSetupFlow({
	onComplete,
}: InitialSetupFlowProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [setupData, setSetupData] = useState<{
		currentSemester: number;
		currentSemesterInfo: SemesterInfo | null;
	}>({
		currentSemester: 0,
		currentSemesterInfo: null,
	});

	const handleSemesterNext = (semester: number) => {
		setSetupData({ ...setupData, currentSemester: semester });
		setCurrentStep(2);
	};

	const handleYearSemesterNext = async (year: number, semester: 1 | 2) => {
		const newSetupData = {
			...setupData,
			currentSemesterInfo: { year, semester },
		};
		setSetupData(newSetupData);

		// Step 2 완료 후 기본 정보만 서버에 전송
		await sendBasicUserInfo(newSetupData);

		// 다음 단계로 이동
		setCurrentStep(3);
	};

	// 기본 사용자 정보만 서버에 전송하는 함수
	// 기본 사용자 정보만 서버에 전송하는 함수
	const sendBasicUserInfo = async (data: typeof setupData) => {
		let currentUser;
		if (isElectron()) {
			currentUser = await window.electronAPI.getStoreValue("user");
		} else {
			currentUser = JSON.parse(localStorage.getItem("user") || "{}");
		}
		console.log("currentUser:", data);
		const userName = currentUser.name || "사용자";
		// API 형식에 맞게 데이터 구성
		const signupData = {
			userName: userName, // 기본값 적용
			userNickname: userName, // 닉네임도 name과 동일하게 설정
			userSemester: data.currentSemester,
			googleId: currentUser.googleId,
			email: currentUser.email,
			yearOfSemester: data?.currentSemesterInfo?.year,
			semesterInYear: data?.currentSemesterInfo?.semester,
		};

		try {
			const serverUrl = import.meta.env.VITE_SERVER_URL;
			if (serverUrl) {
				await axios.post(`${serverUrl}/user/sign_up`, signupData, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log("구글 로그인 성공data확인:", signupData);
				console.log("서버에 기본 사용자 정보 저장 완료");
			}
		} catch (error) {
			console.error("서버 업데이트 실패:", error);
		}
	};

	const handleYearSemesterBack = () => {
		setCurrentStep(1);
	};

	// GraduationInfo에서 호출될 함수
	const handleGraduationTextSubmit = async (text?: string) => {
		if (text) {
			await sendGraduationText(text);
		}
		completeSetup();
	};

	// 졸업심사 텍스트만 서버에 전송하는 함수
	const sendGraduationText = async (graduationText: string) => {
		let currentUser;
		if (isElectron()) {
			currentUser = await window.electronAPI.getStoreValue("user");
		} else {
			currentUser = JSON.parse(localStorage.getItem("user") || "{}");
		}

		try {
			const serverUrl = import.meta.env.VITE_SERVER_URL;
			if (serverUrl && graduationText.trim()) {
				await axios.post(
					`${serverUrl}/grade/${currentUser.googleId}`,
					graduationText,
					{
						headers: {
							"Content-Type": "text/plain", // 텍스트 형태로 전송
						},
					},
				);
				console.log("서버에 졸업심사 정보 저장 완료");
				console.log("전송된 졸업심사 정보:", currentUser.googleId);
			}
		} catch (error) {
			console.error("졸업심사 정보 전송 실패:", error);
		}
	};

	// 설정 완료 및 로컬 저장 처리
	const completeSetup = async () => {
		let currentUser;
		if (isElectron()) {
			currentUser = await window.electronAPI.getStoreValue("user");
		} else {
			currentUser = JSON.parse(localStorage.getItem("user") || "{}");
		}

		const completeUserInfo: UserInfo = {
			...currentUser,
			userSemester: setupData.currentSemester, // currentSemester 대신 userSemester 사용
			currentSemesterInfo: setupData.currentSemesterInfo,
			userNickname: currentUser.name, // 기본값으로 name과 동일하게 설정
		};

		// 로컬 저장
		if (isElectron()) {
			await window.electronAPI.setStoreValue("user", completeUserInfo);
			await window.electronAPI.setStoreValue("userInfo", completeUserInfo);
			await window.electronAPI.setStoreValue(
				`userInfo_${currentUser.googleId}`,
				completeUserInfo,
			);
		} else {
			localStorage.setItem("user", JSON.stringify(completeUserInfo));
			localStorage.setItem("userInfo", JSON.stringify(completeUserInfo));
			localStorage.setItem(
				`userInfo_${currentUser.googleId}`,
				JSON.stringify(completeUserInfo),
			);
		}

		onComplete();
	};

	// 건너뛰기 처리
	const handleSkipGraduation = async () => {
		completeSetup();
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <SemesterSelection onNext={handleSemesterNext} />;
			case 2:
				return (
					<YearSemesterSelection
						currentSemester={setupData.currentSemester}
						onNext={handleYearSemesterNext}
						onBack={handleYearSemesterBack}
					/>
				);
			case 3:
				return (
					<GraduationInfo
						onComplete={handleGraduationTextSubmit}
						onSkip={handleSkipGraduation}
					/>
				);
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
}
