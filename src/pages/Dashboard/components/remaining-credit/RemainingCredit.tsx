import React from 'react';
import * as S from '../styled';
import { RemainingCreditType } from '../../../../types';
import CreditDonut from './CreditDonut';

const RemainingCredit = () => {

  const remainingCreditData: RemainingCreditType = {
		totalCredit: 130,
		attendedCredit: 100,
	};

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
            {remainingCreditData.totalCredit - remainingCreditData.attendedCredit}학점
          </S.RemainingCreditText>
          <S.RemainingCreditDetail>
            {remainingCreditData.totalCredit} 학점 중 {remainingCreditData.attendedCredit} 학점을 수강했어요
          </S.RemainingCreditDetail>
        </S.RemainingCreditContentLeft>
        <S.RemainingCreditContentRight>
          <CreditDonut {...remainingCreditData} />
        </S.RemainingCreditContentRight>
      </S.RemainingCreditContent>
    </S.RemainingCreditContainer>
  );
};

export default RemainingCredit;
