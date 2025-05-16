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
		graduationText: string; // 추가
	}>({
		currentSemester: 0,
		currentSemesterInfo: null,
		graduationText: "", // 추가
	});

	const handleSemesterNext = (semester: number) => {
		setSetupData({ ...setupData, currentSemester: semester });
		setCurrentStep(2);
	};

	const handleYearSemesterNext = (year: number, semester: 1 | 2) => {
		setSetupData({
			...setupData,
			currentSemesterInfo: { year, semester },
		});
		setCurrentStep(3);
	};

	const handleYearSemesterBack = () => {
		setCurrentStep(1);
	};

	// GraduationInfo에서 호출될 함수
	const handleGraduationTextSubmit = (text?: string) => {
		setSetupData({ ...setupData, graduationText: text || "" });
		handleGraduationComplete(text);
	};

	const handleGraduationComplete = async (graduationText?: string) => {
		if (!setupData.currentSemesterInfo) return;

		let currentUser;
		if (isElectron()) {
			currentUser = await window.electronAPI.getStoreValue("user");
		} else {
			currentUser = JSON.parse(localStorage.getItem("user") || "{}");
		}

		const completeUserInfo: UserInfo = {
			...currentUser,
			currentSemester: setupData.currentSemester,
			currentSemesterInfo: setupData.currentSemesterInfo,
		};

		try {
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

			// 서버에 신규 가입 정보 전송 (졸업심사 텍스트 포함)
			const serverUrl = import.meta.env.VITE_API_URL;
			if (serverUrl) {
				try {
					const requestData = {
						...completeUserInfo,
						graduationText: graduationText || setupData.graduationText, // 졸업심사 텍스트 추가
					};

					await axios.post(`${serverUrl}/user/signup`, requestData, {
						headers: {
							"Content-Type": "application/json",
						},
					});
					console.log("서버에 신규 가입 정보 저장 완료");
				} catch (error) {
					console.error("서버 업데이트 실패:", error);
				}
			}

			onComplete();
		} catch (error) {
			console.error("Error saving user info:", error);
		}
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
						onComplete={handleGraduationTextSubmit} // 수정
						onSkip={() => handleGraduationComplete()} // 건너뛰기
					/>
				);
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
}
