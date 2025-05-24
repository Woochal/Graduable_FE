import React from 'react';
import * as S from '../styled';
import { CategoryDataType } from '../../../../types/simulator/simulator';
import CategoryHistory from './CategoryHistory';
import { useState, useEffect } from 'react';

const CourseHistory = ({categoryData}: {categoryData: CategoryDataType[]}) => {

  // 초기 데이터 상태
  const initialData: CategoryDataType[] = [
    {
      id: 0,
      name: "신앙및세계관",
      maxCredit: 9,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 1,
      name: "인성및리더십",
      maxCredit: 6,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 2,
      name: "실무영어",
      maxCredit: 9,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 3,
      name: "전문교양",
      maxCredit: 5,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 4,
      name: "BSM",
      maxCredit: 18,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 5,
      name: "ICT융합기초",
      maxCredit: 2,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 6,
      name: "자유선택",
      maxCredit: 9,
      attendedCredit: 0,
      isFinished: false,
    },
    {
      id: 7,
      name: "전공주제",
      maxCredit: 60,
      attendedCredit: 0,
      isFinished: false,
    }
  ];

  const [data, setData] = useState<CategoryDataType[]>(initialData);

  useEffect(() => {
    // 항상 초기 데이터로 시작
    const updatedData = [...initialData];
    
    // 선택된 학기의 데이터만 적용
    if (categoryData.length > 0) {
      categoryData.forEach((category) => {
        const index = updatedData.findIndex((oneData) => category.name.includes(oneData.name));
        if (index !== -1) {
          updatedData[index] = {
            ...updatedData[index],
            attendedCredit: category.attendedCredit,
            isFinished: category.isFinished
          };
        }
      });
    }
    
    setData(updatedData);
  }, [categoryData]);
  
  return (
    <S.CourseHistoryContainer>
      <S.CourseHistoryContent>
        {data.map((category) => (
          <CategoryHistory key={category.id} categoryData={category} />
        ))}
      </S.CourseHistoryContent>
    </S.CourseHistoryContainer>
  );
};

export default CourseHistory;
