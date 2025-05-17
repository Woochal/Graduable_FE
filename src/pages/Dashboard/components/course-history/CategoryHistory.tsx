import React from 'react';
import * as S from '../styled';
import { CategoryHistoryType } from '../../../../types';
import CreditBar from './CreditBar';
const CategoryHistory = ({ categoryData }: { categoryData: CategoryHistoryType }) => {

 

  return (
    <S.CategoryHistoryContainer>
      <S.CategoryTop isFinished={categoryData.isFinished}>
        <S.CategoryTopText isFinished={categoryData.isFinished}>
          {categoryData.isFinished ? "완료" : `${categoryData.credit} / ${categoryData.maxCredit}` }
        </S.CategoryTopText>
        <S.CreditBar>
          <CreditBar categoryData={categoryData} />
        </S.CreditBar>
      </S.CategoryTop>
     
      <S.CategoryBottom isFinished={categoryData.isFinished}>{categoryData.name }</S.CategoryBottom>
    </S.CategoryHistoryContainer>
  );
};

export default CategoryHistory;
