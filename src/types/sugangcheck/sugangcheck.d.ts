export interface section {
	section: string;
	sectiontotal: number;
}

export interface SugangCheck {
	section: string;
	sectionYear: string;
	sectioncode: string;
	sectionName: string;
	sectionType: string; // 전공필수, 전공선택
	sectionCredit: number;
	sectiongrade: string;
}
