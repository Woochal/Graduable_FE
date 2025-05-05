import React from 'react';
import * as S from '../styled';
import { CategoryHistoryType } from '../../../../types';
import CategoryHistory from './CategoryHistory';

const CourseHistory = () => {

  const categoryHistory: CategoryHistoryType[] = [
    {
      id: 1,
      name: '신앙및세계관',
      credit: 3,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 2,
      name: '인성및리더십',
      credit: 13,
      maxCredit: 13,
      isFinished: true,
    },
    {
      id: 3,
      name: '실무영어',
      credit: 10,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 4,
      name: '전문교양',
      credit: 8,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 5,
      name: 'BSM',
      credit: 5,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 6,
      name: 'ICT융합기초',
      credit: 6,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 7,
      name: '자유선택',
      credit: 12,
      maxCredit: 13,
      isFinished: false,
    },
    {
      id: 8,
      name: '전공주제',
      credit: 10,
      maxCredit: 13,
      isFinished: false,
    },

  ];

  return (
    <S.CourseHistoryContainer>
      <S.CourseHistoryTop>
        <S.CourseHistoryTopTitle>
          수강내역 확인하기
        </S.CourseHistoryTopTitle>
        <S.CourseHistoryTopButton>
          자세히 보기
        </S.CourseHistoryTopButton>
      </S.CourseHistoryTop>
      <S.CourseHistoryContent>
        {categoryHistory?.map((category) => (
          <CategoryHistory key={category.id} categoryData={category} />
        ))}
      </S.CourseHistoryContent>
    </S.CourseHistoryContainer>
  );
};

export default CourseHistory;
