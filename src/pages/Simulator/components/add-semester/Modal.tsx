// components/SemesterModal.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 1000;

  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: ${(props) => props.theme.color.bgCard};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 600px;
  max-width: 90vw;
  position: relative;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.header.fontSize};
  font-weight: ${(props) => props.theme.typography.header.fontWeight};
  margin: 0;
  color: ${(props) => props.theme.color.textPrimary};

`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid #5da3ff;
    outline-offset: 2px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Question = styled.div`
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.color.textPrimary};
`;

const SemesterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 2fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
`;

const SemesterButton = styled.button<{ $selected: boolean }>`
border:none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: ${(props) => (props.$selected ? "#A7E0D9" : "#181822")};
  color: ${(props) => (props.$selected ? "#181822" : "#ddd")};
  cursor: pointer;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$selected ? "600" : "400")};
  box-shadow: ${(props) => (props.$selected ? "0 4px 15px rgba(93, 163, 255, 0.3)" : "none")};
  transform: ${(props) => (props.$selected ? "scale(1.05)" : "scale(1)")};
  
  &:hover {
    background-color: ${(props) => (props.$selected ? "#A7E0D9" : "#4a4b57")};
    transform: scale(1.05);
    border-color: ${(props) => (props.$selected ? "transparent" : "#5da3ff40")};
  }



  &:active {
    transform: scale(0.98);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;
const CancleButton = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border:none;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  background-color: ${(props) =>
		props.$disabled ? "#3d3d45" : props.$primary ? "#A7E0D9" : "transparent"};
  color: ${(props) => (props.$disabled ? "white" : "#666")};
  min-width: 100px;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    background-color: ${(props) =>
			props.$disabled ? "#3d3d45" : props.$primary ? "#A7E0D9" : "#4a4b57"};
  }

  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
const ActionButton = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: ${(props) => (props.$primary ? "none" : "2px solid #4a4b57")};
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  background-color: ${(props) =>
		props.$disabled ? "#3d3d45" : props.$primary ? "#A7E0D9" : "transparent"};
  color: ${(props) => (props.$disabled ? "#666" : "#181822")};
  min-width: 100px;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    background-color: ${(props) =>
			props.$disabled ? "#3d3d45" : props.$primary ? "#A7E0D9" : "#4a4b57"};
  }



  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

interface SemesterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (semester: number) => void;
}

export default function SemesterModal({
	isOpen,
	onClose,
	onSave,
}: SemesterModalProps) {
	const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
	const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	// 모달이 열릴 때마다 초기화
	useEffect(() => {
		if (isOpen) {
			setSelectedSemester(null);
		}
	}, [isOpen]);

	const handleSave = () => {
		if (selectedSemester !== null && selectedSemester) {
			onSave(selectedSemester);
		}
		onClose();
	};

	const handleCancel = () => {
		setSelectedSemester(null);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<ModalOverlay $show={isOpen} onClick={handleCancel}>
			<ModalContainer onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<ModalTitle>로드맵에 추가하기</ModalTitle>
					<CloseButton onClick={handleCancel} aria-label="닫기" tabIndex={0}>
						×
					</CloseButton>
				</ModalHeader>

				<ModalContent>
					<Question>저장할 학기를 선택해주세요</Question>

					<SemesterGrid>
						{semesters.map((semester) => (
							<SemesterButton
								key={semester}
								$selected={selectedSemester === semester}
								onClick={() => setSelectedSemester(semester)}
								aria-pressed={selectedSemester === semester}
								tabIndex={0}
							>
								{semester}학기
							</SemesterButton>
						))}
					</SemesterGrid>
				</ModalContent>

				<ButtonGroup>
					<CancleButton onClick={handleCancel} tabIndex={0}>
						취소하기
					</CancleButton>
					<ActionButton
						$primary
						$disabled={selectedSemester === null}
						onClick={handleSave}
						disabled={selectedSemester === null}
						tabIndex={0}
					>
						저장하기
					</ActionButton>
				</ButtonGroup>
			</ModalContainer>
		</ModalOverlay>
	);
}
