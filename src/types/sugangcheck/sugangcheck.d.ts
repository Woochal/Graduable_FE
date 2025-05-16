export interface section {
	section: string;
	sectiontotal: number;
}

export interface SugangCheck {
	section: string; //section
	sectionYear: string; //들은연도-학기
	sectioncode: string; // 과목코드
	sectionName: string; // 과목명
	sectionType: string; // 전공필수, 전공선택
	sectionCredit: number; // 과목학점
	sectiongrade: string; // 성적
	subjectNode: number; // 설계학점
}
