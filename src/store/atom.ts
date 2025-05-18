// 수정된 atom.ts
import { atom } from "recoil";
import type { section, SugangCheck } from "src/types/sugangcheck/sugangcheck";

// 선택된 section
export const selectionsAtom = atom<string | null>({
	key: "selectionsAtom",
	default: "",
});

// 수강체크 데이터
export const sugangcheckAtom = atom<SugangCheck[]>({
	key: "sugangcheckAtom",
	default: [],
});

// 섹션 데이터
export const sectionsAtom = atom<section[]>({
	key: "sectionsAtom",
	default: [],
});

// 필터 타입
export type FilterType = "교양" | "전공" | "설계" | null;

export const filterTypeAtom = atom<FilterType>({
	key: "filterTypeAtom",
	default: null, // 기본값은 필터링 없음
});

export const semesterAtom = atom<number | null>({
	key: "semesterAtom",
	default: null,
});
