import React, { useState } from 'react';
import * as S from '../styled';
import { Semester } from '../../../../types/simulator/simulator';
const SimulationFilter = () => {
  
  const semesterListDummy: Semester[] = [
    {
      year: 2020,
      semester: 1,
      semesterN: 1,
    },
    {
      year: 2020,
      semester: 2,
      semesterN: 2,
    },
    {
      year: 2021,
      semester: 1,
      semesterN: 3,
    },
    {
      year: 2021,
      semester: 2,
      semesterN: 4,
    },
    {
      year: 2022,
      semester: 1,
      semesterN: 5,
    },
    {
      year: 2022,
      semester: 2,
      semesterN: 6,
    },
    {
      year: 2023,
      semester: 1,
      semesterN: 7,
    },
    {
      year: 2023,
      semester: 2,
      semesterN: 8,
    },
    {
      year: 2024,
      semester: 1,
      semesterN: 9,
    },
    {
      year: 2024,
      semester: 2,
      semesterN: 10,
    },
    {
      year: 2025,
      semester: 1,
      semesterN: 11,
    },
    {
      year: 2025,
      semester: 2,
      semesterN: 12,
    },
    
  ];

  const [selectedSemester, setSelectedSemester] = useState<Semester[]>([]);

  const isSemesterEqual = (s1: Semester, s2: Semester) => {
    return s1.year === s2.year && s1.semester === s2.semester;
  };

  const handleSemesterClick = (semester: Semester) => {

    const isAlreadySelected = selectedSemester.some(s => isSemesterEqual(s, semester));
    
    if(isAlreadySelected) {
      // 선택 해제
      setSelectedSemester(selectedSemester.filter(s => !isSemesterEqual(s, semester)));
    } else {
      // 선택 추가
      setSelectedSemester([...selectedSemester, semester]);
    }

    // TODO: roadmapData 업데이트
  };

  return (
    <S.SimulationFilterContainer>
      <S.SimulationFilterTitle>
        졸업 심사 시뮬레이터
      </S.SimulationFilterTitle>
      <S.SimulationFilterContent>
        <S.SimulationFilterContentTitle>
          졸업심사에 추가하고 싶은 로드맵을 선택해주세요.
        </S.SimulationFilterContentTitle>
        <S.SimulationFilterRoadmapList>
          {semesterListDummy.map((semester, index) => (
            <S.SimulationFilterRoadmapItem key={index} isSelected={selectedSemester.some(s => isSemesterEqual(s, semester))} onClick={() => handleSemesterClick(semester)}>
              {index + 1}학기({semester.year.toString().slice(2,4)}-{semester.semester})
            </S.SimulationFilterRoadmapItem>
          ))}
        </S.SimulationFilterRoadmapList>
      </S.SimulationFilterContent>
    </S.SimulationFilterContainer>
  );
};

export default SimulationFilter;
