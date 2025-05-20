import React, { useState, useEffect } from 'react';
import * as S from '../styled';
import { useNavigate } from 'react-router-dom';
import SemesterFilter from './SemesterFilter';
import CourseSearch from './CourseSearch';
import CourseList from './CourseList';
import SelectedCourseList from './SelectedCourseList';
import { CourseDataAllType, SemesterFilterType } from '../../../../types/simulator/simulator';
import { useQuery } from '@tanstack/react-query';
import { getSearchCourseAPI } from '../../../../axios/SimulatorApi';
import { useQueryClient } from '@tanstack/react-query';

const AddSemester = () => {

  const [searchText, setSearchText] = useState('');
  
  const { data: courseList = [], refetch } = useQuery<CourseDataAllType[]>({
    queryKey: ['courseList', searchText],
    queryFn: () => getSearchCourseAPI(searchText),
    enabled: searchText.length > 0,
  });

  console.log(courseList);

  const [selectedCourseList, setSelectedCourseList] = useState<CourseDataAllType[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<SemesterFilterType>({
    year: 0,
    semester: 0,
  });

  const queryClient = useQueryClient();

  // searchText가 비었을 때 courseList 초기화
  useEffect(() => {
    if (searchText.length <= 0) {
      queryClient.setQueryData(['courseList', searchText], []);
    }
  }, [searchText, queryClient]);

  const handleAddCourse = (course: CourseDataAllType) => {
    // 중복 방지
    if (selectedCourseList.some((c) => c.id === course.id)) {
      return;
    }
    setSelectedCourseList([...selectedCourseList, course]);
  }

  const handleDeleteCourse = (course: CourseDataAllType) => {
    setSelectedCourseList(selectedCourseList.filter((c) => c.id !== course.id));
  }

  // useEffect(() => {
  //   if (searchText === '') {
  //     setCourseList([]);
  //   } else {

  //     const filteredCourseList: CourseDataAllType[] = [];
  //     filteredCourseList.push(...dummyCourseList.filter(course => course.year === selectedFilter.year && course.semester === selectedFilter.semester));

  //     // 대소문자 구별 안하기 위해 모두 소문자 변환
  //     const searchLower = searchText.toLowerCase();
      
  //     const prefixMatches: CourseDataAllType[] = [];
  //     const containsMatches: CourseDataAllType[] = [];
      
  //     filteredCourseList.forEach(course => {
  //       const nameLower = course.name.toLowerCase();
        
  //       // 검색어로 시작하는지 확인
  //       if (nameLower.startsWith(searchLower)) {
  //         prefixMatches.push(course);
  //       }
  //       // 검색어가 포함되는지 확인
  //       else if (nameLower.includes(searchLower)) {
  //         containsMatches.push(course);
  //       }
  //     });
      
  //     // 검색어로 시작하는 것을 먼저, 그 다음에 검색어가 포함되는 것 합치기
  //     setCourseList([...prefixMatches, ...containsMatches]);
  //   }
  // }, [searchText]);



  return (
    <S.AddSemesterContainer>
      <SemesterFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <S.AddSemesterContent>
        <S.AddSemesterContentLeft>
          <CourseSearch searchText={searchText} setSearchText={setSearchText} />
          <CourseList courseList={courseList} handleAddCourse={handleAddCourse} />
        </S.AddSemesterContentLeft>
        <S.AddSemesterContentRight>
          <SelectedCourseList selectedCourseList={selectedCourseList} handleDeleteCourse={handleDeleteCourse} />
        </S.AddSemesterContentRight>
      </S.AddSemesterContent>
    </S.AddSemesterContainer>
  );
};

export default AddSemester;
