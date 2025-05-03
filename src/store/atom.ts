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
