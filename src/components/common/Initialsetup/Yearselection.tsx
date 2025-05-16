// components/InitialSetup/YearSemesterSelection.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
display: flex;
flex-direction: column;
border-radius: 15px;
width: 57.2297vw;
height: 34.1258vw;
background: ${(props) => props.theme.color.bgCard};
  `;

const Title = styled.div`
margin-top: 2rem;
margin-left: 2rem;

  color: #fff;
  font-size: 2rem;
  font-weight: ${(props) => props.theme.typography.title.fontWeight};


`;

const Subtitle = styled.div`
margin-top: 2rem;
margin-left: 2rem;
color: #fff;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;

const SelectionGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 2rem;
  margin-top: 4rem;
`;

const SelectionItem = styled.div`
    display: flex;
  text-align: center;
`;

const Label = styled.div`
  color: #fff;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
    margin-left: 1rem;
    margin-top: 1rem;
  
`;

const Dropdown = styled.select`
  padding: 0.75rem 1.5rem;
  background-color: #2B2C38;
  color: #fff;
  border: 1px solid #3A3B47;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #5DA3FF;
  }
`;

const SemesterButtons = styled.div`
  display: flex;
  gap: 1rem;
    margin-left: 4rem;
  justify-content: center;
`;

const SemesterButton = styled.button<{ $selected: boolean }>`
  padding: 0.75rem 2rem;
  background-color: ${(props) => (props.$selected ? "#9BDAC9" : "#2B2C38")};
  color: ${(props) => (props.$selected ? "#000" : "#fff")};
  border: 1px solid ${(props) => (props.$selected ? "#9BDAC9" : "#3A3B47")};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.$selected ? "#9BDAC9" : "#3A3B47")};
  }
`;

const NavigationButtons = styled.div`
margin-left: 34vw;
  display: flex;
  gap: 1rem;
  margin-top: 4rem;
`;

const Button = styled.button<{ $primary?: boolean; $disabled?: boolean }>`

    padding: 0.75rem 2.5rem;
  background-color: ${(props) => {
		if (props.$disabled) return "#22222E";
		return props.$primary ? "#9BDAC9" : "#22222E";
	}};
  color: ${(props) => {
		if (props.$disabled) return "#666";
		return props.$primary ? "#000" : "#fff";
	}};
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const NavText = styled.span`
  color: #888;
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;

interface YearSemesterSelectionProps {
	currentSemester: number;
	onNext: (year: number, semester: 1 | 2) => void;
	onBack: () => void;
}

export default function YearSemesterSelection({
	currentSemester,
	onNext,
	onBack,
}: YearSemesterSelectionProps) {
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [selectedSemester, setSelectedSemester] = useState<1 | 2 | null>(null);

	const handleNext = () => {
		if (selectedYear && selectedSemester) {
			onNext(selectedYear, selectedSemester);
		}
	};

	const isValidSelection = () => {
		return selectedYear !== null && selectedSemester !== null;
	};

	return (
		<Container>
			<Box>
				<Title>{currentSemester}학기에 해당하는 년도를 선택해주세요.</Title>
				<Subtitle>해당하는 년도-학기를 선택해주세요.</Subtitle>
				<SelectionGroup>
					<SelectionItem>
						<Dropdown
							value={selectedYear || ""}
							onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
						>
							<option value="">선택</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</Dropdown>
						<Label>년</Label>

						<SemesterButtons>
							<SemesterButton
								$selected={selectedSemester === 1}
								onClick={() => setSelectedSemester(1)}
							>
								1
							</SemesterButton>
							<SemesterButton
								$selected={selectedSemester === 2}
								onClick={() => setSelectedSemester(2)}
							>
								2
							</SemesterButton>
						</SemesterButtons>
						<Label>학기</Label>
					</SelectionItem>
				</SelectionGroup>

				<NavigationButtons>
					<Button onClick={onBack}>
						<NavText>이전</NavText>
					</Button>
					<Button
						$primary
						$disabled={!isValidSelection()}
						onClick={handleNext}
						disabled={!isValidSelection()}
					>
						다음
					</Button>
				</NavigationButtons>
			</Box>
		</Container>
	);
}
