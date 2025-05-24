import React, { useEffect } from "react";
import * as S from "./components/styled";
import CourseHistory from "./components/course-history/CourseHistory";
import Roadmap from "./components/roadmap/Roadmap";
import RemainingCredit from "./components/remaining-credit/RemainingCredit";
import { RemainingCreditType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getFilteredSimulationResultAPI } from "../../axios/SimulatorApi";
import { userDataRecoil } from "../../atom/UserAtom";
import { useRecoilValue } from "recoil";
import { RoadmapDataType, CategoryDataType } from "../../types/simulator/simulator";


const DashboardPage = () => {

	const userData = useRecoilValue(userDataRecoil);
	const semesterList: number[] = [];
	
	useEffect(() => {
		for(let i = 1; i < userData.userSemester; i++) {
			semesterList.push(i);
		}
	}, [userData.userSemester]);

	const { data: simulationResultDashBoardData = {
		categoryData: [
			{
			id: 1,
			name: '신앙및세계관',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 2,
			name: '인성및리더십',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 3,
			name: '실무영어',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 4,
			name: '전문교양',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 5,
			name: 'BSM',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 6,
			name: 'ICT융합기초',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 7,
			name: '자유선택',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
			{
			id: 8,
			name: '전공주제',
			credit: 0,
			maxCredit: 13,
			isFinished: false,
			},
		],
		totalCredit: 0,
		attendedCredit: 0,
		attendedCreditPercent: 0,
		leftCreditPercent: 0,
	  } } = useQuery<RoadmapDataType>({
		queryKey: ['simulationResultDashBoardData', semesterList], // 시뮬레이터에서 현 학기 정보로 시작하고 싶으면 이름 통일?
		queryFn: () => getFilteredSimulationResultAPI(userData.googleId, semesterList),
		enabled: userData.googleId !== null,
	  });
	
	return (
		<S.Container>
			<S.UpperContainer>
				<Roadmap />
				<RemainingCredit simulationResultData={{
					totalCredit: simulationResultDashBoardData.totalCredit,
					attendedCredit: simulationResultDashBoardData.attendedCredit,
					attendedCreditPercent: simulationResultDashBoardData.attendedCreditPercent,
					leftCreditPercent: simulationResultDashBoardData.leftCreditPercent,
				}} />
			</S.UpperContainer>
			<CourseHistory categoryData={simulationResultDashBoardData.categoryData as CategoryDataType[]} />
		</S.Container>
	);
}

export default DashboardPage;
