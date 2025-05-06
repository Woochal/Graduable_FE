export type Subject = {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
};

export const normalizeSubjectName = (name: string): string => {
    return name.replace(/\s+/g, '');
};

// 모든 과목의 좌표 정보
export const ALL_SUBJECTS: Subject[] = [
    {
        id: 'engineering-design-intro',
        name: '공학설계입문',
        position: { x: 143, y: 120 },
    },
    {
        id: 'practical-project-1',
        name: '실전프로젝트1',
        position: { x: 345, y: 125 },
    },
    {
        id: 'ai-project-intro',
        name: 'AI프로젝트입문',
        position: { x: 440, y: 150 },
    },
    {
        id: 'engineering-project-planning',
        name: '공학프로젝트기획',
        position: { x: 534, y: 126 },
    },
    {
        id: 'capstone-design',
        name: '캡스톤디자인',
        position: { x: 630, y: 122 },
    },
    {
        id: 'data-structure',
        name: '데이타구조',
        position: { x: 240, y: 324 },
    },
    {
        id: 'discrete-mathematics',
        name: '이산수학',
        position: { x: 345, y: 321 },
    },
    {
        id: 'computer-architecture',
        name: '컴퓨터구조',
        position: { x: 343, y: 407 },
    },
    {
        id: 'operating-system',
        name: '운영체제',
        position: { x: 349, y: 408 },
    },
    {
        id: 'c-programming',
        name: 'C프로그래밍',
        position: { x: 145, y: 406 },
    },
    {
        id: 'c-programming-practice',
        name: 'C프로그래밍실습',
        position: { x: 143, y: 451 },
    },
    {
        id: 'logic-design',
        name: '논리설계',
        position: { x: 243, y: 408 },
    },
    {
        id: 'open-source-software-practice',
        name: '오픈소스소프트웨어실습',
        position: { x: 240, y: 436 },
    },
    {
        id: 'circuit-theory-1',
        name: '회로이론1',
        position: { x: 241, y: 473 },
    },
    {
        id: 'basic-electronics-experiment',
        name: '기초전자공학실험',
        position: { x: 242, y: 507 },
    },
    {
        id: 'digital-system-design',
        name: '디지털시스템설계',
        position: { x: 340, y: 436 },
    },
    {
        id: 'embedded-processor-application',
        name: '임베디드프로세서응용',
        position: { x: 436, y: 438 },
    },
    {
        id: 'electronic-circuit-1',
        name: '전자회로1',
        position: { x: 437, y: 475 },
    },
    {
        id: 'iot-system-design',
        name: 'IoT시스템설계',
        position: { x: 535, y: 443 },
    },
    {
        id: 'iot-practice',
        name: 'IoT실습',
        position: { x: 627, y: 446 },
    },
    {
        id: 'ic-design',
        name: '직접회로설계',
        position: { x: 725, y: 459 },
    },
    {
        id: 'java-programming',
        name: '자바프로그래밍언어',
        position: { x: 241, y: 289 },
    },
    {
        id: 'web-service-development',
        name: '웹서비스개발',
        position: { x: 343, y: 288 },
    },
    {
        id: 'object-oriented-design-pattern',
        name: '객체지향설계패턴',
        position: { x: 437, y: 294 },
    },
    {
        id: 'mobile-app-development',
        name: '모바일앱개발',
        position: { x: 533, y: 289 },
    },
    {
        id: 'problem-solving-through-computational-thinking',
        name: '컴퓨터과학적사고를통한문제해결',
        position: { x: 537, y: 323 },
    },
    {
        id: 'computer-graphics',
        name: '컴퓨터그래픽스',
        position: { x: 631, y: 321 },
    },
    {
        id: 'compiler-theory',
        name: '컴파일러이론',
        position: { x: 631, y: 353 },
    },
    {
        id: 'computer-security',
        name: '컴퓨터보안',
        position: { x: 725, y: 354 },
    },
    {
        id: 'computer-vision',
        name: '컴퓨터비전',
        position: { x: 341, y: 177 },
    },
    {
        id: 'signals-and-systems',
        name: '신호및시스템',
        position: { x: 341, y: 211 },
    },
    {
        id: 'probability-theory',
        name: '확률변수론',
        position: { x: 531, y: 210 },
    },
    {
        id: 'neural-network-theory',
        name: '신경망이론',
        position: { x: 531, y: 177 },
    },
    {
        id: 'deep-learning-intro',
        name: '딥러닝개론',
        position: { x: 630, y: 177 },
    },
    {
        id: 'machine-learning',
        name: '머신러닝',
        position: { x: 727, y: 176 },
    },
    {
        id: 'deep-learning-image-processing',
        name: '딥러닝영상처리',
        position: { x: 727, y: 199 },
    },
    {
        id: 'multi-sensor-signal-processing',
        name: '다중센서신호처리',
        position: { x: 727, y: 226 },
    },
    {
        id: 'career-design',
        name: '직업과진로설계',
        position: { x: 535, y: 72 },
    },
    {
        id: 'it-startup-practice',
        name: 'IT창업실습',
        position: { x: 535, y: 98 },
    },
    {
        id: 'post-capstone-research',
        name: '포스트캡스톤연구',
        position: { x: 726, y: 127 },
    },
    {
        id: 'calculus-2',
        name: 'Calculus2',
        position: { x: 47, y: 180 },
    },
    {
        id: 'physics-intro',
        name: '물리학개론',
        position: { x: 47, y: 212 },
    },
    {
        id: 'physics-1',
        name: '물리학1',
        position: { x: 47, y: 212 },
    },
    {
        id: 'physics-experiment-1',
        name: '물리학실험1',
        position: { x: 47, y: 241 },
    },
    {
        id: 'computer-electronics-intro',
        name: '컴퓨터및전자공학개론',
        position: { x: 47, y: 288 },
    },
    {
        id: 'statistics',
        name: '통계학',
        position: { x: 142, y: 223 },
    },
    {
        id: 'linear-algebra',
        name: '선형대수학',
        position: { x: 438, y: 243 },
    },
    {
        id: 'database',
        name: '데이타베이스',
        position: { x: 439, y: 179 },
    },
    {
        id: 'algorithm-analysis',
        name: '알고리듬분석',
        position: { x: 438, y: 324 },
    },
    {
        id: 'software-engineering',
        name: '소프트웨어공학',
        position: { x: 629, y: 292 },
    },
    {
        id: 'programming-language-theory',
        name: '프로그래밍언어론',
        position: { x: 538, y: 368 },
    },
    {
        id: 'computer-network',
        name: '컴퓨터네트워크',
        position: { x: 532, y: 413 },
    },
];

// 현재 수강한 과목 목록
export const TAKEN_SUBJECTS = ['통계학', '컴퓨터보안', '데이타베이스', '소프트웨어공학', '회로이론1'];

// 수강한 과목만 필터링하여 반환
export const SUBJECTS = ALL_SUBJECTS.filter((subject) =>
    TAKEN_SUBJECTS.some((taken) => normalizeSubjectName(taken) === normalizeSubjectName(subject.name))
);
