import React from 'react';
import * as S from '../styled';
import { CategoryDataType } from '../../../../types/simulator/simulator';
import CategoryHistory from './CategoryHistory';
import { useNavigate } from 'react-router-dom';

const CourseHistory = ({categoryData}: {categoryData: CategoryDataType[]}) => {
  
  const navigate = useNavigate();

  // const categoryData: CategoryDataType[] = [
  //   {
  //     id: 1,
  //     name: '신앙및세계관',
  //     credit: 3,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 2,
  //     name: '인성및리더십',
  //     credit: 13,
  //     maxCredit: 13,
  //     isFinished: true,
  //   },
  //   {
  //     id: 3,
  //     name: '실무영어',
  //     credit: 10,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 4,
  //     name: '전문교양',
  //     credit: 8,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 5,
  //     name: 'BSM',
  //     credit: 5,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 6,
  //     name: 'ICT융합기초',
  //     credit: 6,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 7,
  //     name: '자유선택',
  //     credit: 12,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },
  //   {
  //     id: 8,
  //     name: '전공주제',
  //     credit: 10,
  //     maxCredit: 13,
  //     isFinished: false,
  //   },

  // ];

  return (
    <S.CourseHistoryContainer>
      <S.CourseHistoryContent>
        {categoryData?.map((category) => (
          <CategoryHistory key={category.id} categoryData={category} />
        ))}
      </S.CourseHistoryContent>
    </S.CourseHistoryContainer>
  );
};

export default CourseHistory;
