import React, { useState, useEffect } from 'react';
import * as S from '../styled';
import { useNavigate } from 'react-router-dom';
import SemesterFilter from './SemesterFilter';
import CourseSearch from './CourseSearch';
import CourseList from './CourseList';
import SelectedCourseList from './SelectedCourseList';
import { CourseDataAllType } from '../../../../types/simulator/simulator';

const AddSemester = () => {

  const dummyCourseList: CourseDataAllType[] = [
    {
      id: '1',
      time: '월5, 목5',
      name: 'Database System',
      credit: 3,
      major: true,
      room: 'OH401',
      professor: '홍참길',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '2',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '3',
      time: '월5, 목5',
      name: 'Database System',
      credit: 3,
      major: true,
      room: 'OH401',
      professor: '홍참길',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '4',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '5',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '6',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '7',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: false,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '8',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '9',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: false,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '10',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '11',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
    {
      id: '12',
      time: '월2, 목2',
      name: 'Software Engineering',
      credit: 3,
      major: true,
      room: 'NTH402',
      professor: '남재창',
      gradeType: true,
      isEnglish: true,
      year: 2025,
      semester: 1,
    },
  ];
  
  const [searchText, setSearchText] = useState('');
  const [courseList, setCourseList] = useState<CourseDataAllType[]>([]);
  const [selectedCourseList, setSelectedCourseList] = useState<CourseDataAllType[]>([]);

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

  useEffect(() => {
    if (searchText === '') {
      setCourseList([]);
    } else {

      // 대소문자 구별 안하기 위해 모두 소문자 변환
      const searchLower = searchText.toLowerCase();
      
      const prefixMatches: CourseDataAllType[] = [];
      const containsMatches: CourseDataAllType[] = [];
      
      dummyCourseList.forEach(course => {
        const nameLower = course.name.toLowerCase();
        
        // 검색어로 시작하는지 확인
        if (nameLower.startsWith(searchLower)) {
          prefixMatches.push(course);
        }
        // 검색어가 포함되는지 확인
        else if (nameLower.includes(searchLower)) {
          containsMatches.push(course);
        }
      });
      
      // 검색어로 시작하는 것을 먼저, 그 다음에 검색어가 포함되는 것 합치기
      setCourseList([...prefixMatches, ...containsMatches]);
    }
  }, [searchText]);


  // useEffect(() => {
  //   const fetchCourseList = async () => {
  //     const response = await axios.get('/api/courseList');
  //     setCourseList(response.data);
  //   };
  //   fetchCourseList();
  // }, []);


  return (
    <S.AddSemesterContainer>
      <SemesterFilter />
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
