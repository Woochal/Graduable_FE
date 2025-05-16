import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  color: ${(props) => (props.$isActive ? props.theme.color.textSelected : props.theme.color.textSub)};
  background-color: ${(props) => (props.$isActive ? props.theme.color.primary : props.theme.color.bgCard)};
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
  color: ${(props) => (props.$isActive ? props.theme.color.textSelected : props.theme.color.textSub)};

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

type FilterType = "교양" | "전공" | "설계";

export default function CourseFilter() {
	const [filterType, setFilterType] = useRecoilState(filterTypeAtom);
	const setSelectedSection = useSetRecoilState(selectionsAtom);

	const filters: FilterType[] = ["전공", "교양", "재이수", "설계"];

	const handleFilterClick = (type: FilterType) => {
		if (filterType === type) {
			// 같은 필터를 다시 클릭하면 해제
			setFilterType(null);
		} else {
			// 새로운 필터 선택
			setFilterType(type);
			// 필터 타입 선택 시 섹션 선택을 해제하여 전체 데이터에서 필터링
			setSelectedSection(null);
		}
	};

	return (
		<FilterContainer>
			<ControlIcon src={Control} />
			{filters.map((filter) => (
				<FilterButton
					key={filter}
					$isActive={filterType === filter}
					onClick={() => handleFilterClick(filter)}
				>
					<CheckIcon $isActive={filterType === filter}>
						<VectorIcon src={filterType === filter ? vector : disvector} />
					</CheckIcon>
					{filter}
				</FilterButton>
			))}
		</FilterContainer>
	);
}
