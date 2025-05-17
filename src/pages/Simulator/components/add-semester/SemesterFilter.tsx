import React, { useState } from 'react';
import * as S from '../styled';
import Dropdown from '../../../../components/common/Dropdown';
import { SemesterFilterType } from '../../../../types/simulator/simulator';

const SemesterFilter = () => {

  const year = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
  const semester = ['1', '2'];

  const [selectedFilter, setSelectedFilter] = useState<SemesterFilterType>({
    year: 0,
    semester: '',
  });


  return (
    <S.SemesterFilterContainer>
      <S.SemesterFilterYear>
          <Dropdown<number> 
            data={year} 
            selectedData={selectedFilter.year} 
            setSelectedData={(newYear) => setSelectedFilter(prev => ({...prev, year: newYear}))} 
          />
        <S.SemesterFilterYearText>년</S.SemesterFilterYearText>
      </S.SemesterFilterYear>
      <S.SemesterFilterSemester>
        <Dropdown<string> 
          data={semester} 
          selectedData={selectedFilter.semester} 
          setSelectedData={(newSemester) => setSelectedFilter(prev => ({...prev, semester: newSemester}))} 
          width="6.25vw"
        />
        <S.SemesterFilterSemesterText>학기</S.SemesterFilterSemesterText>
      </S.SemesterFilterSemester>
      <S.SemesterFilterInfo>연도-학기를 선택해주세요.</S.SemesterFilterInfo>
    </S.SemesterFilterContainer>
  );
};

export default SemesterFilter;
