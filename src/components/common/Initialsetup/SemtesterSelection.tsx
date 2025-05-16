// components/InitialSetup/SemesterSelection.tsx
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

const SemesterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 2fr));
  gap: 1rem;
  /* width: 100%; */
  max-width: 640.24px;
  margin-top: 2rem;
  margin-left: 3rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SemesterButton = styled.button<{ $selected: boolean }>`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.$selected ? "#9BDAC9" : "#2B2C38")};
  color: ${(props) => (props.$selected ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => (props.$selected ? "#9BDAC9" : "#3A3B47")};
  }
`;

const NextButton = styled.button<{ $disabled?: boolean }>`
  margin-top: 2rem;
  margin-left: 47vw;
  width: 97.05px;
 height: 40px;

  background-color: ${(props) => (props.$disabled ? "#3A3B47" : "#9BDAC9")};
  color: ${(props) => (props.$disabled ? "#666" : "#000")};
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

interface SemesterSelectionProps {
	onNext: (semester: number) => void;
}

export default function SemesterSelection({ onNext }: SemesterSelectionProps) {
	const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
	const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const handleNext = () => {
		if (selectedSemester !== null) {
			onNext(selectedSemester);
		}
	};

	return (
		<Container>
			<Box>
				<Title>회원님의 학기 수를 선택해주세요.</Title>
				<Subtitle>현재 학기 수를 선택해주세요.</Subtitle>
				<SemesterGrid>
					{semesters.map((semester) => (
						<SemesterButton
							key={semester}
							$selected={selectedSemester === semester}
							onClick={() => setSelectedSemester(semester)}
						>
							{semester}학기
						</SemesterButton>
					))}
				</SemesterGrid>

				<NextButton
					$disabled={selectedSemester === null}
					onClick={handleNext}
					disabled={selectedSemester === null}
				>
					다음
				</NextButton>
			</Box>
		</Container>
	);
}
