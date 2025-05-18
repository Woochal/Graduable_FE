import React, { useState } from 'react';
import * as S from '../styled';
import SearchIcon from '../../../../assets/Search_Small.png';


const CourseSearch = ({ searchText, setSearchText }: { searchText: string, setSearchText: (text: string) => void }) => {
  

  return (
    <S.CourseSearchContainer>
      <S.CourseSearchInput placeholder="과목 이름을 검색해주세요." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <S.CourseSearchIcon>
        <img src={SearchIcon} alt="search" />
      </S.CourseSearchIcon>
    </S.CourseSearchContainer>
  );
};

export default CourseSearch;
