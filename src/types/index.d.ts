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
    attendedCredit: number;
    maxCredit: number;
    isFinished: boolean;
}

export interface RemainingCreditType {
    totalCredit: number;
    attendedCredit: number;
    attendedCreditPercent: number;
    leftCreditPercent: number;
}

export interface CourseDataType {
    name: string;
    credit: number;
    major: boolean;
    professor?: string;
    classroom?: string;
}

// 학기별 데이터 타입
export interface SemesterCoursesType {
    [key: string]: RoadmapCourseDataType[]; // 예: "2024-1": [과목1, 과목2, ...]
}

// 전체 로드맵 데이터 타입
export type RoadmapSemesterData = SemesterCoursesType[];

export interface RoadmapCourseDataType {
    courseName: string;
    credit: number;
    category: boolean; // 전공 여부
    semester: number; // 학기
    courseID: number;
}

declare module '*.pdf' {
    const content: string;
    export default content;
}

interface ElectronAPI {
    // Store 관련
    getStoreValue: (key: string) => Promise<unknown>;
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    removeStoreValue: (key: string) => Promise<void>;

    // Auth 관련
    logout: () => Promise<void>;
    on: (channel: string, callback: (code: string) => void) => void;

    // 시스템 정보
    versions: {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    };

    // Electron 환경 확인
    isElectron: boolean;

    // 애플리케이션 경로
    getAppPath: () => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
