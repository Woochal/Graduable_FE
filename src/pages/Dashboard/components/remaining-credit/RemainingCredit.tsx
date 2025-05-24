import React from 'react';
import * as S from '../styled';
import { RemainingCreditType } from '../../../../types';
import CreditDonut from './CreditDonut';

const RemainingCredit = ({ simulationResultData }: { simulationResultData: RemainingCreditType }) => {

  return (
    <S.RemainingCreditContainer>
      <S.CourseHistoryTop>
        <S.CourseHistoryTopTitle>
          전체 잔여 학점
        </S.CourseHistoryTopTitle>
        {/* <S.CourseHistoryTopButton>
          자세히 보기
        </S.CourseHistoryTopButton> */}
      </S.CourseHistoryTop>
      <S.RemainingCreditContent>
        <S.RemainingCreditContentLeft>
          <S.RemainingCreditText>
            {simulationResultData.totalCredit - simulationResultData.attendedCredit}학점
          </S.RemainingCreditText>
          <S.RemainingCreditDetail>
            {simulationResultData.totalCredit} 학점 중 {simulationResultData.attendedCredit} 학점을 수강했어요.
          </S.RemainingCreditDetail>
        </S.RemainingCreditContentLeft>
        <S.RemainingCreditContentRight>
          <CreditDonut {...simulationResultData} />
          <S.RemainingCreditDetailPercent>
            졸업까지 {simulationResultData.leftCreditPercent.toFixed(0)}% 남았어요.
          </S.RemainingCreditDetailPercent>
        </S.RemainingCreditContentRight>
      </S.RemainingCreditContent>
    </S.RemainingCreditContainer>
  );
};

export default RemainingCredit;
