// 전체 CourseHistory.tsx 안전하게 수정
import React, { useCallback } from "react";
import * as S from "./components/styled";
import CourseSection from "./components/CourseSection";
import { CourseList } from "./components/CouseList";
import CourseFilter from "./components/CourseFilter";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
	selectionsAtom,
	sugangcheckAtom,
	sectionsAtom,
	filterTypeAtom,
} from "../../store/atom";
import { filterSectionSuggestor } from "../../store/selector";
import { sectionData } from "../../mockdata";
import type { section, SugangCheck } from "../../types/sugangcheck/sugangcheck";
import { Sugangtitle } from "./components/styled";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 설계학점 추출 함수
const extractDesignCredit = (note: string): number => {
	if (!note) return 0;

	// "(설계)(1)" 또는 "(설계)1" 등의 형식에서 숫자 추출
	const designMatch = note.match(/\(설계\)\(?(\d+)\)?/);
	if (designMatch && designMatch[1]) {
		return Number.parseInt(designMatch[1], 10);
	}
	return 0; // 설계학점이 없는 경우 0 반환
};

// 재이수 여부 확인 함수
const hasRetake = (note: string): boolean => {
	if (!note) return false;
	return note.includes("재이수");
};
const isElectron = () => {
	return window.electronAPI !== undefined;
};

export default function CourseHistory() {
	const [selectedSection, setSelectedSection] = useState<string | null>(null);
	const [sectionList, setSectionList] = useState<section[]>([]);
	const [sugangCheckList, setSugangCheckList] = useState<SugangCheck[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const setSelections = useSetRecoilState<string | null>(selectionsAtom);
	const setSugangCheck = useSetRecoilState(sugangcheckAtom);
	const setSections = useSetRecoilState(sectionsAtom);
	const setFilterType = useSetRecoilState(filterTypeAtom);
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
	const [previousSelectedSection, setPreviousSelectedSection] = useState<
		string | null
	>(null);
	const filterType = useRecoilValue(filterTypeAtom);

	// 필터 타입 변경 감시 useEffect 수정
	useEffect(() => {
		if (filterType !== null) {
			// 필터가 선택되었을 때, 현재 선택된 섹션을 저장
			if (selectedSection) {
				setPreviousSelectedSection(selectedSection);
				// 여기서는 selectedSection은 그대로 유지하고
				// Recoil state만 null로 설정하여 필터링 적용
				setSelections(null);
			}
		} else {
			// 필터가 해제되었을 때, 이전에 선택된 섹션으로 복원
			if (previousSelectedSection) {
				// 저장된 이전 섹션으로 복원
				setSelections(previousSelectedSection);
			}
		}
	}, [filterType, selectedSection, previousSelectedSection, setSelections]);

	useEffect(() => {
		const fetchData = async () => {
			let userData;
			let userInfoData;

			if (isElectron()) {
				userData = await window.electronAPI.getStoreValue("user");
				userInfoData = await window.electronAPI.getStoreValue("userInfo");
			} else {
				const stored = localStorage.getItem("user");
				const storedInfo = localStorage.getItem("userInfo");
				userData = stored ? JSON.parse(stored) : null;
				userInfoData = storedInfo ? JSON.parse(storedInfo) : null;
			}
			try {
				setLoading(true);

				// 섹션 데이터 가져오기 (기존 방식 유지)
				const sectionsResponse = await new Promise<section[]>((resolve) => {
					setTimeout(() => {
						resolve(sectionData);
					}, 0);
				});

				setSections(sectionsResponse);
				setSectionList(sectionsResponse);

				// 기본값으로 첫 번째 섹션 선택
				if (sectionsResponse.length > 0) {
					const defaultSection = sectionsResponse[0].section;
					setSelectedSection(defaultSection);
					setSelections(defaultSection);
				}

				// API에서 수강내역 데이터 가져오기
				try {
					const googleId = userData.googleId; // 실제 구글 ID로 대체해야 합니다
					console.log("API 응답:", googleId);
					const response = await axios.get(
						`${import.meta.env.VITE_SERVER_URL}/grade/${googleId}`,
						{
							headers: {
								Accept: "application/json",
							},
						},
					);

					console.log("Fetched course data:", response.data);
					console.log("Response data type:", typeof response.data);

					// 응답 데이터 처리 - 배열인지 확인
					let courseData = response.data;

					// 데이터가 배열이 아닌 경우 처리
					if (!Array.isArray(courseData)) {
						console.warn(
							"API 응답이 배열이 아닙니다. 응답 형태:",
							typeof courseData,
						);

						// 객체이고 데이터가 있는 경우
						if (typeof courseData === "object" && courseData !== null) {
							// 객체 내에 배열 찾기
							let foundArray = null;

							// 일반적인 API 응답 패턴 확인
							if (Array.isArray(courseData.data)) {
								foundArray = courseData.data;
							} else if (Array.isArray(courseData.grades)) {
								foundArray = courseData.grades;
							} else if (Array.isArray(courseData.courses)) {
								foundArray = courseData.courses;
							} else {
								// 객체 내 모든 속성 확인
								for (const key in courseData) {
									if (Array.isArray(courseData[key])) {
										foundArray = courseData[key];
										console.log(`배열 발견: '${key}' 속성`);
										break;
									}
								}
							}

							if (foundArray) {
								courseData = foundArray;
							} else {
								// 배열을 찾을 수 없는 경우 빈 배열 사용
								console.error("API 응답에서 배열 데이터를 찾을 수 없습니다.");
								courseData = [];
							}
						} else {
							// 객체도 아닌 경우 빈 배열 사용
							courseData = [];
						}
					}

					// 데이터를 가공하여 설계학점 추출 및 추가
					const processedData = courseData.map((course) => ({
						...course,
						designCredit: extractDesignCredit(course.subjectNote),
					}));

					setSugangCheck(processedData);
					setSugangCheckList(processedData);

					// 각 섹션별 진행률 계산
					const progressData = sectionsResponse.map((sectionItem) => {
						const sectionCourses = processedData.filter(
							(course) => course.classification === sectionItem.section,
						);
						const completedCredits = sectionCourses.reduce(
							(total, course) => total + course.credit,
							0,
						);
						const totalCredits = sectionItem.sectiontotal;
						const progressPercentage = Math.min(
							(completedCredits / totalCredits) * 100,
							100,
						);
						const remainingCredits = Math.max(
							totalCredits - completedCredits,
							0,
						);

						return {
							section: sectionItem.section,
							completedCredits,
							totalCredits,
							remainingCredits: remainingCredits,
							progressPercentage,
						};
					});
					setSectionProgress(progressData);
				} catch (apiError) {
					console.error("API 데이터 가져오기 오류:", apiError);

					// API 오류 상세 정보 출력
					if (
						typeof apiError === "object" &&
						apiError !== null &&
						"response" in apiError
					) {
						const err = apiError as { response?: any };
						console.error("Error response data:", err.response?.data);
						console.error("Error response status:", err.response?.status);
					} else if (
						typeof apiError === "object" &&
						apiError !== null &&
						"request" in apiError
					) {
						const err = apiError as { request?: any };
						console.error("No response received:", err.request);
					} else if (
						typeof apiError === "object" &&
						apiError !== null &&
						"message" in apiError
					) {
						const err = apiError as { message?: string };
						console.error("Error message:", err.message);
					}
				}

				setLoading(false);
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

			// 어떤 상태에서든 섹션 클릭 시 필터 해제하고 해당 섹션으로 바로 이동
			setFilterType(null); // 필터 해제
			setSelections(sectionName); // 선택된 섹션 설정
			setPreviousSelectedSection(sectionName); // 이전 섹션도 업데이트
		},
		[setSelections, setFilterType, setPreviousSelectedSection],
	);
	return (
		<Container>
			<Sugangtitle>수강내역 확인하기</Sugangtitle>
			<FilterWrapper>
				<CourseFilter />
			</FilterWrapper>
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
