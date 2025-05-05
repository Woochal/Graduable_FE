import React from 'react';
import * as S from '../styled';
import RoadmapCourse from './RoadmapCourse';
import { CourseDataType, RoadmapSemesterData } from '../../../../types';

const Roadmap = () => {

  const roadmapCourseData : CourseDataType[] = [
    {
      name: '모바일 앱 개발',
      credit: 3,
      major: true,
    },
    {
      name: '문제해결 스튜디오',
      credit: 2,
      major: true,
    },
    {
      name: '이공계 글쓰기',
      credit: 3,
      major: false,
    },
    {
      name: '컴퓨터 네트워크',
      credit: 3,
      major: true,
    },
    {
      name: '한국사(근현대사)',
      credit: 3,
      major: false,
    },
    {
      name: '캡스톤디자인1',
      credit: 2,
      major: true,
    },
    {
      name: '스크롤도 가능하다',
      credit: 3,
      major: true,
    },
    {
      name: '캬캬캬캬캬',
      credit: 2,
      major: true,
    },
  ];

  const roadmapSemesterData : RoadmapSemesterData = {
    year: 2024,
    semester: 2,
    semesterN: 12,
    courses: roadmapCourseData,
  };

  return (
    <S.RoadmapContainer>

      <S.CourseHistoryTop>
        <S.CourseHistoryTopTitle>
          학기별 로드맵
        </S.CourseHistoryTopTitle>
        <S.CourseHistoryTopButton>
          자세히 보기
        </S.CourseHistoryTopButton>
      </S.CourseHistoryTop>

      <S.RoadmapContent>

        <RoadmapCourse courseData={roadmapCourseData} />

        <S.CourseInformation>
          
          <S.CourseTypeInformation>
            <S.CourseTypeMajor>
              <S.CourseTypeSign major={true} style={{ width: '0.625vw', height: '0.625vw' }} /> 전공
            </S.CourseTypeMajor>
            <S.CourseTypeLiberal>
              <S.CourseTypeSign major={false} style={{ width: '0.625vw', height: '0.625vw' }} /> 교양
            </S.CourseTypeLiberal>
          </S.CourseTypeInformation>

          <S.CourseCreditInformation>
              {roadmapCourseData.reduce((acc, course) => acc + course.credit, 0)}학점
          </S.CourseCreditInformation>

        </S.CourseInformation>

        <S.RoadmapSemester>
          {roadmapSemesterData.year}-{roadmapSemesterData.semester} {roadmapSemesterData.semesterN}학기
        </S.RoadmapSemester>

      </S.RoadmapContent>
    </S.RoadmapContainer>
  );
};

export default Roadmap;
