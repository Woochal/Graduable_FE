// 수정된 CourseFilter.tsx
import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { filterTypeAtom, selectionsAtom } from "../../../store/atom";
import vector from "../../../assets/Vector.png";
import Control from "../../../assets/Control.png";
import disvector from "../../../assets/Vectornotactive.png";

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
  align-items: center;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  color: ${(props) =>
		props.$isActive
			? props.theme.color.textSelected
			: props.theme.color.textSub};
  background-color: ${(props) =>
		props.$isActive ? props.theme.color.primary : props.theme.color.bgCard};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  min-width: 70.45px;
  height: 32px;
`;

const CheckIcon = styled.span<{ $isActive: boolean }>`
  margin-right: 0.5rem;
  display: inline-block;
  color: ${(props) =>
		props.$isActive
			? props.theme.color.textSelected
			: props.theme.color.textSub};
  font-size: 1.3rem;
`;

const VectorIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

const ControlIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

// 필터 타입과 표시 레이블 매핑
const filterOptions = [
	// 교양/전공 필터
	{ value: "교양", label: "교양" },
	{ value: "전공", label: "전공" },
	// 설계/재이수 필터
	{ value: "설계", label: "설계" },
];

export default function CourseFilter() {
	const [filterType, setFilterType] = useRecoilState(filterTypeAtom);

	const handleFilterClick = (type: "교양" | "전공" | "설계") => {
		// 같은 필터를 다시 클릭하면 해제, 다른 필터를 클릭하면 변경
		setFilterType(filterType === type ? null : type);
		// 섹션 선택 해제는 CourseHistory.tsx의 useEffect에서 처리
	};

	return (
		<FilterContainer>
			<ControlIcon src={Control} />
			{filterOptions.map((filter) => (
				<FilterButton
					key={filter.value}
					$isActive={filterType === filter.value}
					onClick={() => handleFilterClick(filter.value as any)}
				>
					<CheckIcon $isActive={filterType === filter.value}>
						<VectorIcon
							src={filterType === filter.value ? vector : disvector}
						/>
					</CheckIcon>
					{filter.label}
				</FilterButton>
			))}
		</FilterContainer>
	);
}
