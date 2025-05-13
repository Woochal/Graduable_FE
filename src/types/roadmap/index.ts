export interface Course {
    name: string;
    credits: number;
    type: '전공' | '교양';
}

export interface Semester {
    id: string; // e.g., "21-1"
    title: string; // e.g., "1학기 (21-1)"
    courses: Course[];
}

export const semesterData: Semester[] = [
    {
        id: '21-1',
        title: '1학기 (21-1)',
        courses: [
            { name: 'Software Engineering', credits: 3, type: '전공' },
            { name: 'C프로그래밍', credits: 3, type: '전공' },
            { name: 'EAP', credits: 3, type: '전공' },
            { name: '소프트웨어입문', credits: 2, type: '전공' },
            { name: '성경의이해', credits: 2, type: '교양' },
            { name: '과학기술과 인간정신', credits: 3, type: '교양' },
            { name: '인간관계와 자기성장', credits: 3, type: '교양' },
            { name: 'Software Engineering', credits: 3, type: '전공' },
            { name: 'C프로그래밍', credits: 3, type: '전공' },
            { name: 'EAP', credits: 3, type: '전공' },
            { name: '소프트웨어입문', credits: 2, type: '전공' },
            { name: '성경의이해', credits: 2, type: '교양' },
            { name: '과학기술과 인간정신', credits: 3, type: '교양' },
            { name: '인간관계와 자기성장', credits: 3, type: '교양' },
        ],
    },
    {
        id: '21-2',
        title: '2학기 (21-2)',
        courses: [
            { name: '자료구조', credits: 3, type: '전공' },
            { name: '객체지향프로그래밍', credits: 3, type: '전공' },
            { name: '컴퓨터구조', credits: 3, type: '전공' },
            { name: '창의적사고와글쓰기', credits: 3, type: '교양' },
            { name: '영어회화', credits: 2, type: '교양' },
            { name: '현대사회와윤리', credits: 3, type: '교양' },
        ],
    },
    {
        id: '22-1',
        title: '3학기 (22-1)',
        courses: [
            { name: '알고리즘', credits: 3, type: '전공' },
            { name: '운영체제', credits: 3, type: '전공' },
            { name: '데이터베이스', credits: 3, type: '전공' },
            { name: '인공지능', credits: 3, type: '전공' },
            { name: '글로벌시민교육', credits: 2, type: '교양' },
            { name: '미래사회와직업', credits: 3, type: '교양' },
        ],
    },
    {
        id: '22-2',
        title: '4학기 (22-2)',
        courses: [
            { name: '컴퓨터네트워크', credits: 3, type: '전공' },
            { name: '소프트웨어설계', credits: 3, type: '전공' },
            { name: '웹프로그래밍', credits: 3, type: '전공' },
            { name: '모바일프로그래밍', credits: 3, type: '전공' },
            { name: '기업가정신', credits: 2, type: '교양' },
            { name: '창업과경영', credits: 3, type: '교양' },
        ],
    },
    {
        id: '23-1',
        title: '5학기 (23-1)',
        courses: [
            { name: '클라우드컴퓨팅', credits: 3, type: '전공' },
            { name: '빅데이터분석', credits: 3, type: '전공' },
            { name: '머신러닝', credits: 3, type: '전공' },
            { name: '보안프로그래밍', credits: 3, type: '전공' },
            { name: '글로벌리더십', credits: 2, type: '교양' },
            { name: '국제관계론', credits: 3, type: '교양' },
        ],
    },
    {
        id: '23-2',
        title: '6학기 (23-2)',
        courses: [
            { name: '블록체인', credits: 3, type: '전공' },
            { name: 'IoT프로그래밍', credits: 3, type: '전공' },
            { name: '게임개발', credits: 3, type: '전공' },
            { name: 'UI/UX디자인', credits: 3, type: '전공' },
            { name: '창의적문제해결', credits: 2, type: '교양' },
            { name: '디지털리터러시', credits: 3, type: '교양' },
        ],
    },
    {
        id: '24-1',
        title: '7학기 (24-1)',
        courses: [
            { name: '인공지능윤리', credits: 3, type: '전공' },
            { name: '로봇공학', credits: 3, type: '전공' },
            { name: '컴퓨터비전', credits: 3, type: '전공' },
            { name: '자연어처리', credits: 3, type: '전공' },
            { name: '미래기술과사회', credits: 2, type: '교양' },
            { name: '창업실무', credits: 3, type: '교양' },
        ],
    },
    {
        id: '24-2',
        title: '8학기 (24-2)',
        courses: [
            { name: '캡스톤디자인', credits: 3, type: '전공' },
            { name: '졸업프로젝트', credits: 3, type: '전공' },
            { name: '산학협력프로젝트', credits: 3, type: '전공' },
            { name: '인턴십', credits: 3, type: '전공' },
            { name: '취업준비실습', credits: 2, type: '교양' },
            { name: '진로설계', credits: 3, type: '교양' },
        ],
    },
];
