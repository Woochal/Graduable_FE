import React from 'react';
import * as S from '../styled';
import CreditDonut from './CreditDonut';
import CreditBar from './CreditBar';
import { RoadmapDataType } from '../../../../types/simulator/simulator';
import CourseHistory from './CourseHistory';
import { useQuery } from '@tanstack/react-query';
import { getFilteredSimulationResultAPI } from '../../../../axios/SimulatorApi';
import { userDataRecoil } from '../../../../atom/UserAtom';
import { useRecoilValue } from 'recoil';
import { selectedSemesterRecoil } from '../../../../atom/SimulationAtom';
const SimulationResult = () => {

  const userData = useRecoilValue(userDataRecoil);
  const selectedSemester = useRecoilValue(selectedSemesterRecoil);
  const { data: simulationResultData = {
    categoryData: [],
    totalCredit: 0,
    attendedCredit: 0,
    attendedCreditPercent: 0,
    leftCreditPercent: 0,
  } } = useQuery<RoadmapDataType>({
    queryKey: ['simulationResultData', selectedSemester],
    queryFn: () => getFilteredSimulationResultAPI(userData.googleId, selectedSemester),
    enabled: userData.googleId !== null && selectedSemester.length > 0,
  });  

  return (
    <S.SimulationResultContainer>
      <S.SimulationResultDonutDiv>
        <CreditDonut {...simulationResultData} />
        <S.DonutInfoDiv>{simulationResultData?.attendedCredit} / {simulationResultData?.totalCredit} <S.DonutInfoSpan>&nbsp;(전체 학점 기준)</S.DonutInfoSpan></S.DonutInfoDiv>
      </S.SimulationResultDonutDiv>
      <S.SimulationResultCreditBarDiv>
        <CourseHistory categoryData={simulationResultData?.categoryData} />
      </S.SimulationResultCreditBarDiv>
      
    </S.SimulationResultContainer>
  );
};

export default SimulationResult;
