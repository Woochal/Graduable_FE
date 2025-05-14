import { selector } from "recoil";
import { selectionsAtom, sugangcheckAtom, filterTypeAtom } from "./atom";
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
				(result) => result.section === selectedSection,
			);
		}

		// 2. 추가 타입 필터링 (옵션)
		if (filterType !== null) {
			filteredResults = filteredResults.filter((result) => {
				switch (filterType) {
					case "교양":
						return result.section !== "전공주제";
					case "전공":
						return result.section === "전공주제";
					case "설계":
						return result.subjectNode && result.subjectNode > 0;
					default:
						return true;
				}
			});
		}

		return filteredResults;
	},
});
