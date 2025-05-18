import React, { useState } from 'react';
import * as S from '../styled';
import Dropdown from '../../../../components/common/Dropdown';
import { SemesterFilterType } from '../../../../types/simulator/simulator';

const SemesterFilter = ({selectedFilter, setSelectedFilter}: {selectedFilter: SemesterFilterType, setSelectedFilter: (filter: SemesterFilterType) => void}) => {


  const year = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  const semester = ['1', '2'];
 

  return (
    <S.SemesterFilterContainer>
      <S.SemesterFilterYear>
          <Dropdown<number> 
            data={year} 
            selectedData={selectedFilter.year} 
            setSelectedData={(newYear) => setSelectedFilter({...selectedFilter, year: newYear})} 
          />
        <S.SemesterFilterYearText>년</S.SemesterFilterYearText>
      </S.SemesterFilterYear>
      <S.SemesterFilterSemester>
        {/* <Dropdown<string> 
          data={semester} 
          selectedData={selectedFilter.semester} 
          setSelectedData={(newSemester) => setSelectedFilter(prev => ({...prev, semester: newSemester}))} 
          width="6.25vw"
        /> */}
        <S.SemesterFilterSemesterSelect>
          <S.SemesterFilterSemesterOption isSelected={selectedFilter.semester === 1} onClick={() => setSelectedFilter({...selectedFilter, semester: 1})}>1</S.SemesterFilterSemesterOption>
          <S.SemesterFilterSemesterOption isSelected={selectedFilter.semester === 2} onClick={() => setSelectedFilter({...selectedFilter, semester: 2})}>2</S.SemesterFilterSemesterOption>
        </S.SemesterFilterSemesterSelect>
        <S.SemesterFilterSemesterText>학기</S.SemesterFilterSemesterText>
      </S.SemesterFilterSemester>
      <S.SemesterFilterInfo>연도-학기를 선택해주세요.</S.SemesterFilterInfo>
    </S.SemesterFilterContainer>
  );
};

export default SemesterFilter;
