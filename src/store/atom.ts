import { atom } from "recoil";
import type { section, SugangCheck } from "src/types/sugangcheck/sugangcheck";

//sugangcheckAtom

export const selectionsAtom = atom<string | null>({
	key: "selectionsAtom",
	default: "",
});

export const sugangcheckAtom = atom<SugangCheck[]>({
	key: "sugangcheckAtom",
	default: [],
});

export const sectionsAtom = atom<section[]>({
	key: "sectionsAtom",
	default: [],
});

export const filterTypeAtom = atom<"교양" | "전공" | "설계" | null>({
	key: "filterTypeAtom",
	default: null, // 기본값은 필터링 없음
});

export const semesterAtom = atom<number | null>({
	key: "semesterAtom",
	default: null,
});
