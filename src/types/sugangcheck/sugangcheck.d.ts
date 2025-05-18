// 최종 수정된 sugangcheck.ts 타입
export interface section {
	section: string;
	sectiontotal: number;
}

export interface SugangCheckborn {
	classification: string; // 구분 (이전 section)
	yearAndSemesterCourseTaken: string; // 들은연도-학기 (이전 sectionYear)
	courseName: string; // 과목명 (이전 sectionName)
	category: string; // 이수구분 (전공필수, 전공선택, 교선 등)
	credit: number; // 과목학점 (이전 sectionCredit)
	grade: string; // 성적 (이전 sectiongrade)
	subjectNote: string; // 비고 (일반적인 메모)
}

export interface SugangCheck {
	classification: string; // 구분 (이전 section)
	yearAndSemesterCourseTaken: string; // 들은연도-학기 (이전 sectionYear)
	courseName: string; // 과목명 (이전 sectionName)
	category: string; // 이수구분 (전공필수, 전공선택, 교선 등)
	credit: number; // 과목학점 (이전 sectionCredit)
	grade: string; // 성적 (이전 sectiongrade)
	subjectNote: string; // 비고 (일반적인 메모)
	designCredit: number; // 설계학점 (subjectNote에서 설계학점만 추출하여 숫자로 저장)
}
