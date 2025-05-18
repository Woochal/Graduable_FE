// 수정된 selector.ts
import { selector } from "recoil";
import { selectionsAtom, sugangcheckAtom, filterTypeAtom } from "./atom";

// 교양 관련 분류 목록
const LIBERAL_ARTS_CLASSIFICATIONS = [
	"자유선택(교양)",
	"전문교양",
	"실무영어",
	"신앙및세계관",
	"인성및리더십",
	"ICT융합기초",
	"BSM",
];

// 전공 관련 분류 목록
const MAJOR_CLASSIFICATIONS = ["전공주제(AI컴퓨터심화)"];

export const filterSectionSuggestor = selector({
	key: "filteredSuggestionsSelector",
	get: ({ get }) => {
		const selectedSection = get(selectionsAtom);
		const results = get(sugangcheckAtom);
		const filterType = get(filterTypeAtom);

		let filteredResults = results;

		// 1. 먼저 섹션 필터링 (기본)
		if (selectedSection) {
			filteredResults = filteredResults.filter(
				(result) => result.classification === selectedSection,
			);
		}

		// 2. 추가 타입 필터링 (옵션)
		if (filterType !== null) {
			filteredResults = filteredResults.filter((result) => {
				switch (filterType) {
					case "교양":
						return LIBERAL_ARTS_CLASSIFICATIONS.includes(result.classification);
					case "전공":
						return MAJOR_CLASSIFICATIONS.includes(result.classification);
					case "설계":
						// 설계학점이 0보다 큰 경우 필터링
						return result.designCredit > 0;

					default:
						return true;
				}
			});
		}

		return filteredResults;
	},
});
