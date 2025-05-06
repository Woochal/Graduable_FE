import type React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import type {
	section,
	SugangCheck,
} from "../../../types/sugangcheck/sugangcheck";
import { theme } from "../../../styles/theme";
import {
	ProgressContainer,
	ProgressFill,
	SectionAllBox,
	SectionBox,
	SectionGrid,
	Sugangtitle,
	SectionName,
	SectionInfo,
} from "./styled";
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
const VerticalProgressBar: React.FC<{ progress: number; color: string }> = ({
	progress,
	color,
}) => {
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
export default function CourseSection({
	sectionList,
	selectedSection,
	loading,
	onSectionClick,
	//courseList,
	sectionProgress,
}: CourseSectionProps) {
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
				<SectionAllBox>
					<Sugangtitle>수강내역 확인하기</Sugangtitle>
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
										<SectionInfo>{progress.remainingCredits}학점</SectionInfo>
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
										{sectionItem.section}
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
