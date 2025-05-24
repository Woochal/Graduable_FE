export interface SemesterFilterType {
    year: number;
    semester: number;
} 

// 추가하고 싶은 과목 선택할 때 필요한 데이터
export interface CourseDataAllType {
    id: number;
    time: string;
    name: string;
    credit: number;
    major: boolean;
    room: string;
    professor: string;
    gradeType: boolean;
    isEnglish: boolean;
    year: number; // ex) 2025
    semester: number; // ex) 1, 2, 3(여름 계절학기), 4(겨울 계절학기)
}

// 졸업심사 결과에 사용되는 데이터

export interface CategoryDataType {
    id: number;
    name: string;
    maxCredit: number;
    attendedCredit: number;
    isFinished: boolean;
}

export interface RoadmapDataType {
	categoryData: CategoryDataType[];
	totalCredit: number;
    attendedCredit: number;
    attendedCreditPercent: number;
    leftCreditPercent: number;
	
}

export interface Semester {
    year: number;
    semester: number;
    semesterN: number;
}