import React, { useCallback } from "react";
import * as S from "./components/styled";
import CourseSection from "./components/CourseSection";
import { CourseList } from "./components/CouseList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
	selectionsAtom,
	sugangcheckAtom,
	sectionsAtom,
} from "../../store/atom";
import { filterSectionSuggestor } from "../../store/selector";
import { sectionData, sectionDetailData } from "../../mockdata";
import type { section, SugangCheck } from "../../types/sugangcheck/sugangcheck";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 14vw;
	`;

export default function CourseHistory() {
	const [selectedSection, setSelectedSection] = useState<string | null>(null);
	const [sectionList, setSectionList] = useState<section[]>([]);
	const [sugangCheckList, setSugangCheckList] = useState<SugangCheck[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const setSelections = useSetRecoilState<string | null>(selectionsAtom);
	const setSugangCheck = useSetRecoilState(sugangcheckAtom);
	const setSections = useSetRecoilState(sectionsAtom);
	const courseList = useRecoilValue(filterSectionSuggestor);
	const [sectionProgress, setSectionProgress] = useState<
		{
			section: string;
			completedCredits: number;
			totalCredits: number;
			remainingCredits: number;
			progressPercentage: number;
		}[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				// 섹션 데이터 가져오기
				const response = await new Promise<section[]>((resolve) => {
					setTimeout(() => {
						resolve(sectionData);
					}, 0);
				});

				setSections(response);
				setSectionList(response);

				// 기본값으로 첫 번째 섹션 선택
				if (response.length > 0) {
					const defaultSection = response[0].section;
					setSelectedSection(defaultSection); // 섹션 별 정보
					setSelections(defaultSection);
				}

				// 섹션 상세 데이터 가져오기
				const detailResponse = await new Promise<SugangCheck[]>((resolve) => {
					setTimeout(() => {
						resolve(sectionDetailData);
					}, 0);
				});

				setSugangCheck(detailResponse);
				setSugangCheckList(detailResponse); // 전체 수강 정보
				setLoading(false);

				// 각 섹션별 진행률 계산
				const progressDate = response.map((sectionItem) => {
					// 섹션 별 과목 필터링
					const sectionCourses = detailResponse.filter(
						(course) => course.section === sectionItem.section,
					);
					// 섹션 별 이수학점 계산
					const completedCredits = sectionCourses.reduce(
						(total, course) => total + course.sectionCredit,
						0,
					);

					// 섹션 별 총학점 계산

					const totalCredits = sectionItem.sectiontotal;
					// 진행률 (100%를 넘지 않도록)
					const progressPercentage = Math.min(
						(completedCredits / totalCredits) * 100,
						100,
					);

					const remainingCredits = Math.max(totalCredits - completedCredits, 0);

					return {
						section: sectionItem.section,
						completedCredits,
						totalCredits,
						remainingCredits: remainingCredits,
						progressPercentage,
					};
				});
				setSectionProgress(progressDate);
			} catch (error) {
				console.error("Error fetching section data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [setSections, setSugangCheck, setSelections]);

	const handleSectionClick = useCallback(
		(sectionName: string) => {
			setSelectedSection(sectionName);
			setSelections(sectionName);
		},
		[setSelections],
	);

	console.log(sectionProgress);
	return (
		<Container>
			<CourseSection
				sectionList={sectionList}
				selectedSection={selectedSection}
				loading={loading}
				onSectionClick={handleSectionClick}
				sectionProgress={sectionProgress}
			/>
			<CourseList courseList={courseList} />
		</Container>
	);
}
