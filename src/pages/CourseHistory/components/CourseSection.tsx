// CourseSection.tsx 수정
import type React from "react";
import styled from "styled-components";
import type { section } from "../../../types/sugangcheck/sugangcheck";
import { theme } from "../../../styles/theme";
import {
	ProgressContainer,
	ProgressFill,
	SectionAllBox,
	SectionBox,
	SectionGrid,
	Sugangtitle,
	PerfecSectionInfo,
	SectionName,
	SectionInfo,
} from "./styled";
import { useRecoilState } from "recoil";
import { selectionsAtom } from "../../../store/atom";

interface CourseSectionProps {
	sectionList: section[];
	selectedSection: string | null;
	loading: boolean;
	onSectionClick: (sectionName: string) => void;
	sectionProgress: SectionProgressData[];
}

interface SectionProgressData {
	section: string;
	completedCredits: number;
	totalCredits: number;
	remainingCredits: number;
	progressPercentage: number;
}

interface VerticalProgressBarProps {
	progress: number;
	color: string;
}

// 섹션 이름 매핑 함수
const getDisplaySectionName = (sectionName: string): string => {
	// 교양 관련 분류
	if (
		[
			"자유선택(교양)",
			"전문교양",
			"실무영어",
			"신앙및세계관",
			"인성및리더십",
			"BSM",
			"ICT융합기초",
		].includes(sectionName)
	) {
		return sectionName; // 원래 이름 유지 (섹션 표시에서는 원래 이름 사용)
	}
	// 전공 관련 분류
	if (["전공주제(AI컴퓨터심화)", "BSM"].includes(sectionName)) {
		return sectionName; // 원래 이름 유지 (섹션 표시에서는 원래 이름 사용)
	}
	// 그 외의 경우 원래 분류명 반환
	return sectionName;
};

const VerticalProgressBar = ({ progress, color }: VerticalProgressBarProps) => {
	const clampedProgress = Math.min(Math.max(progress, 0), 100);

	return (
		<ProgressContainer>
			<ProgressFill
				progress={clampedProgress}
				progressColor={color}
				initial={{ height: 0 }}
				animate={{ height: `${clampedProgress}%` }}
				transition={{ duration: 0.5 }}
			/>
		</ProgressContainer>
	);
};

const Explan = styled.div`
  font-size: ${(props) => props.theme.typography.subTitle.fontSize};
  font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
  color: ${(props) => props.theme.color.textSub};
  margin-left: 1.7vw;
`;

export default function CourseSection({
	sectionList,
	selectedSection,
	loading,
	onSectionClick,
	sectionProgress,
}: CourseSectionProps) {
	const [selectedSections, setSelectedSections] = useRecoilState<string | null>(
		selectionsAtom,
	);

	// 색상 결정 함수
	const getProgressColor = (progress: number) => {
		if (progress >= 100) return theme.color.primary; // 완료
		return theme.color.highlightGray; // 진행 중 (높음)
	};

	// 특정 섹션의 진행 데이터 찾기 함수
	const findSectionProgress = (sectionName: string) => {
		return (
			sectionProgress.find((prog) => prog.section === sectionName) || {
				section: sectionName,
				completedCredits: 0,
				totalCredits: 0,
				remainingCredits: 0,
				progressPercentage: 0,
			}
		);
	};

	return (
		<SectionGrid>
			{loading ? (
				<div>데이터를 불러오는 중입니다...</div>
			) : (
				<SectionAllBox selected={!!selectedSections}>
					<Explan>상단의 텍스트는 [잔여학점 / 전체학점] 을 나타냅니다.</Explan>
					<div style={{ display: "flex", marginTop: "2.5vw" }}>
						{sectionList.map((sectionItem) => {
							const progress = findSectionProgress(sectionItem.section);
							const progressColor = getProgressColor(
								progress.progressPercentage,
							);
							return (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										marginLeft: "1.25vw",
									}}
									key={sectionItem.section}
								>
									<SectionBox
										$isSelected={selectedSection === sectionItem.section}
										onClick={() => onSectionClick(sectionItem.section)}
									>
										{progress.remainingCredits === 0 ? (
											<PerfecSectionInfo>완료</PerfecSectionInfo>
										) : (
											<SectionInfo>
												{progress.remainingCredits}/{progress.totalCredits}
											</SectionInfo>
										)}

										<div
											style={{
												padding: "0.8vw",
												display: "flex",
												flexDirection: "column",
												height: "100%",
												alignItems: "center", // 가로 중앙 정렬
												width: "100%", // 전체 너비 사용
											}}
										>
											<VerticalProgressBar
												progress={progress.progressPercentage}
												color={progressColor}
											/>
										</div>
									</SectionBox>
									<SectionName
										$isSelected={selectedSection === sectionItem.section}
									>
										{/* 화면에 표시할 때는 간결한 이름으로 변환 */}
										{getDisplaySectionName(sectionItem.section)}
									</SectionName>
								</div>
							);
						})}
					</div>
				</SectionAllBox>
			)}
		</SectionGrid>
	);
}
