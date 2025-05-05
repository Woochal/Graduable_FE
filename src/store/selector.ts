import { selector } from "recoil";
import { selectionsAtom, sugangcheckAtom } from "./atom";
export const filterSectionSuggestor = selector({
	key: "filteredSuggestionsSelector",
	get: ({ get }) => {
		const selectedSection = get(selectionsAtom);
		const results = get(sugangcheckAtom);

		// 선택된 section이 없으면 전체 결과를 반환
		if (!selectedSection) {
			return results;
		}

		// section과 정확히 일치하는 결과만 필터링
		const filteredResults = results.filter(
			(result) => result.section === selectedSection,
		);

		return filteredResults;
	},
});
