import React from 'react';
import * as S from '../styled';
import { CategoryDataType } from '../../../../types/simulator/simulator';
import CategoryHistory from './CategoryHistory';
import { useNavigate } from 'react-router-dom';

const CourseHistory = ({ categoryData }: { categoryData: CategoryDataType[] }) => {
  
  const navigate = useNavigate();
  console.log(categoryData);

  return (
    <S.CourseHistoryContainer>
      <S.CourseHistoryTop>
        <S.CourseHistoryTopTitle>
          수강내역 확인하기
          <S.CourseHistoryTopTitleSpan>
            상단의 텍스트는 [잔여학점 / 전체학점] 을 나타냅니다.
          </S.CourseHistoryTopTitleSpan>
        </S.CourseHistoryTopTitle>
        <S.CourseHistoryTopButton onClick={() => {
          navigate('/history');
        }}>
          자세히 보기
        </S.CourseHistoryTopButton>
      </S.CourseHistoryTop>
      <S.CourseHistoryContent>
        {categoryData?.map((category) => (
          <CategoryHistory key={category.id} categoryData={category} />
        ))}
      </S.CourseHistoryContent>
    </S.CourseHistoryContainer>
  );
};

export default CourseHistory;
