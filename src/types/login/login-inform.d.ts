// src/types/login/login-inform.ts
export interface SemesterInfo {
	year: number;
	semester: 1 | 2;
}

export interface UserInfo {
	// Google 인증 정보
	googleId: string;
	email: string;
	name: string;

	// 학생 정보 (초기 설정 시 추가)
	currentSemester?: number;
	currentSemesterInfo?: SemesterInfo;

	// 초기 설정 시에만 사용 (선택적)
	graduationText?: string;
}
