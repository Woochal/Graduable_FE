import type { SugangCheck, section } from "src/types/sugangcheck/sugangcheck";

// Mock data for sections
export const sectionData: section[] = [
	{ section: "신앙및세계관", sectiontotal: 9 },
	{ section: "인성및리더십", sectiontotal: 6 },
	{ section: "실무영어", sectiontotal: 9 },
	{ section: "전문교양", sectiontotal: 5 },
	{ section: "BSM", sectiontotal: 18 },
	{ section: "ICT융합기초", sectiontotal: 2 },
	{ section: "자유선택(교양)", sectiontotal: 9 },
	{ section: "전공주제(AI컴퓨터심화)", sectiontotal: 60 },
];

export const sectionDetailData: SugangCheck[] = [
	// 전공주제 (Major Subjects) courses

	{
		section: "전공주제",
		sectionYear: "2021-1",
		sectioncode: "GEK90058",
		sectionName: "전공기초세미나",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 2,
	},
	{
		section: "전공주제",
		sectionYear: "2021-1",
		sectioncode: "GEK90058",
		sectionName: "전공기초세미나",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 2,
	},

	{
		section: "전공주제",
		sectionYear: "2021-2",
		sectioncode: "GEK90060",
		sectionName: "컴퓨터 프로그래밍",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 2,
	},
	{
		section: "전공주제",
		sectionYear: "2022-1",
		sectioncode: "GEK90061",
		sectionName: "데이터 통신",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A+",
		subjectNode: 2,
	},
	{
		section: "전공주제",
		sectionYear: "2022-1",
		sectioncode: "GEK90062",
		sectionName: "임베디드 시스템",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "B",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2022-2",
		sectioncode: "GEK90063",
		sectionName: "모바일 응용",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2022-2",
		sectioncode: "GEK90064",
		sectionName: "컴파일러",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-1",
		sectioncode: "GEK90065",
		sectionName: "인공지능",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-1",
		sectioncode: "GEK90066",
		sectionName: "웹시스템 개발",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-2",
		sectioncode: "GEK90067",
		sectionName: "정보보호",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A+",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-2",
		sectioncode: "GEK90068",
		sectionName: "시스템 프로그래밍",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "B",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2024-1",
		sectioncode: "GEK90069",
		sectionName: "졸업프로젝트",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2024-1",
		sectioncode: "GEK90070",
		sectionName: "컴퓨터 그래픽스",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2021-1",
		sectioncode: "GEK90071",
		sectionName: "데이터베이스 시스템",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2021-2",
		sectioncode: "GEK90072",
		sectionName: "네트워크 보안",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A+",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2022-1",
		sectioncode: "GEK90073",
		sectionName: "고급 알고리즘",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2022-2",
		sectioncode: "GEK90074",
		sectionName: "소프트웨어 테스팅",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "B",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-1",
		sectioncode: "GEK90075",
		sectionName: "웹서버 프로그래밍",
		sectionType: "전선",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "전공주제",
		sectionYear: "2023-2",
		sectioncode: "GEK90076",
		sectionName: "클라우드 컴퓨팅",
		sectionType: "전필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},

	// 신영및세계관 (Faith and Worldview) courses

	{
		section: "신앙 및 세계관",
		sectionYear: "2021-2",
		sectioncode: "GEK20060",
		sectionName: "창조와 진화",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "신앙 및 세계관",
		sectionYear: "2022-1",
		sectioncode: "GEK20061",
		sectionName: "기독교 윤리",
		sectionType: "교선필",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},

	// 인성및리더십 (Character and Leadership) courses

	{
		section: "인성및리더십",
		sectionYear: "2021-1",
		sectioncode: "GEK30059",
		sectionName: "인성과 소통",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "인성및리더십",
		sectionYear: "2021-2",
		sectioncode: "GEK30060",
		sectionName: "팀워크와 협력",
		sectionType: "교선필",
		sectionCredit: 2,
		sectiongrade: "A+",
		subjectNode: 0,
	},

	// 실무영어 (Practical English) courses
	{
		section: "실무영어",
		sectionYear: "2021-1",
		sectioncode: "GEK40058",
		sectionName: "영어회화 I",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "실무영어",
		sectionYear: "2021-1",
		sectioncode: "GEK40059",
		sectionName: "비즈니스 영어",
		sectionType: "교선필",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "실무영어",
		sectionYear: "2021-2",
		sectioncode: "GEK40060",
		sectionName: "영어회화 II",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},

	{
		section: "전문교양",
		sectionYear: "2021-1",
		sectioncode: "GEK50059",
		sectionName: "철학의 이해",
		sectionType: "교선필",
		sectionCredit: 2,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "전문교양",
		sectionYear: "2021-2",
		sectioncode: "GEK50060",
		sectionName: "문학과 인간",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A+",
		subjectNode: 0,
	},

	// BSM (Basic Science and Mathematics) courses
	{
		section: "BSM",
		sectionYear: "2021-1",
		sectioncode: "GEK60058",
		sectionName: "미적분학 I",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "BSM",
		sectionYear: "2021-1",
		sectioncode: "GEK60059",
		sectionName: "일반물리학 I",
		sectionType: "교선필",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "BSM",
		sectionYear: "2021-2",
		sectioncode: "GEK60060",
		sectionName: "미적분학 II",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "BSM",
		sectionYear: "2022-1",
		sectioncode: "GEK60061",
		sectionName: "일반물리학 II",
		sectionType: "교선필",
		sectionCredit: 3,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "BSM",
		sectionYear: "2022-1",
		sectioncode: "GEK60062",
		sectionName: "일반화학 I",
		sectionType: "교필",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "BSM",
		sectionYear: "2022-2",
		sectioncode: "GEK60063",
		sectionName: "일반화학 II",
		sectionType: "교선필",
		sectionCredit: 3,
		sectiongrade: "A+",
		subjectNode: 0,
	},

	// ICT융합기초 (ICT Convergence Basics) courses
	{
		section: "ICT융합기초",
		sectionYear: "2021-1",
		sectioncode: "GEK70058",
		sectionName: "프로그래밍 기초",
		sectionType: "교필",
		sectionCredit: 2,
		sectiongrade: "A-",
		subjectNode: 0,
	},

	{
		section: "자유선택",
		sectionYear: "2023-2",
		sectioncode: "GEK80090",
		sectionName: "현대인의 건강관리",
		sectionType: "자선",
		sectionCredit: 3,
		sectiongrade: "A-",
		subjectNode: 0,
	},
	{
		section: "자유선택",
		sectionYear: "2024-1",
		sectioncode: "GEK80091",
		sectionName: "문화콘텐츠의 이해",
		sectionType: "자선",
		sectionCredit: 3,
		sectiongrade: "A",
		subjectNode: 0,
	},
	{
		section: "자유선택",
		sectionYear: "2021-1",
		sectioncode: "GEK80092",
		sectionName: "와인의 세계",
		sectionType: "자선",
		sectionCredit: 2,
		sectiongrade: "B+",
		subjectNode: 0,
	},
	{
		section: "자유선택",
		sectionYear: "2021-2",
		sectioncode: "GEK80093",
		sectionName: "커피의 이해",
		sectionType: "자선",
		sectionCredit: 1,
		sectiongrade: "A",
		subjectNode: 0,
	},

	// 전공주제 (Major Subjects) courses
];
