import React, { useState, useEffect } from 'react';
import * as S from '../styled';
import { Semester } from '../../../../types/simulator/simulator';
import { userDataRecoil } from '../../../../atom/UserAtom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSemesterRecoil } from '../../../../atom/SimulationAtom';
import { useQueryClient } from '@tanstack/react-query';

const SimulationFilter = () => {

  const userData = useRecoilValue(userDataRecoil);
  const [semesterList, setSemesterList] = useState<Semester[]>([]);

  console.log(userData);

  useEffect(() => {
    const newSemesterList: Semester[] = [];
    for(let i = 1; i <= userData.userSemester; i++) {
      newSemesterList.push({
        year: userData.yearOfSemester - Math.floor((userData.userSemester - i )/ 2),
        semester: (i + 1) % 2 + 1,
        semesterN: i,
      });
    }
    setSemesterList(newSemesterList);
  }, [userData.userSemester, userData.yearOfSemester]);

  // const queryClient = useQueryClient();

  

  const [selectedSemester, setSelectedSemester] = useRecoilState<number[]>(selectedSemesterRecoil);

  const isSemesterEqual = (s1: Semester, s2: Semester) => {
    return s1.year === s2.year && s1.semester === s2.semester;
  };

  const handleSemesterClick = (semester: number) => {

    const isAlreadySelected = selectedSemester.some(s => s === semester);
    
    if(isAlreadySelected) {
      // 선택 해제
      setSelectedSemester(selectedSemester.filter(s => s !== semester));
    } else {
      // 선택 추가
      setSelectedSemester([...selectedSemester, semester]);
    }

  };

  // useEffect(() => {
  //   console.log(selectedSemester);
  //   queryClient.invalidateQueries({ queryKey: ['simulationResultData'] });
  // }, [selectedSemester]);

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
          {semesterList.map((semester, index) => (
            <S.SimulationFilterRoadmapItem key={index} isSelected={selectedSemester.some(s => s === index + 1)} onClick={() => handleSemesterClick(index + 1)}>
              {index + 1}학기({semester.year.toString().slice(2,4)}-{semester.semester})
            </S.SimulationFilterRoadmapItem>
          ))}
        </S.SimulationFilterRoadmapList>
      </S.SimulationFilterContent>
    </S.SimulationFilterContainer>
  );
};

export default SimulationFilter;
