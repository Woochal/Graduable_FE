export interface MenuItemActiveType {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}
  
export interface MenuItemType {
    name: string;
    path: string;
} 

export interface CategoryHistoryType {
    id: number;
    name: string;
    credit: number;
    maxCredit: number;
    isFinished: boolean;
}

export interface RemainingCreditType {
    totalCredit: number;
    attendedCredit: number;
}

export interface CourseDataType {
    name: string;
    credit: number;
    major: boolean;
    professor?: string;
    classroom?: string;
}

export interface RoadmapSemesterData {
    year: number;
    semester: number;
    semesterN: number;
    courses: CourseDataType[];
}