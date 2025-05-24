import React from 'react';
import * as S from '../styled';
import RoadmapCourse from './RoadmapCourse';
import { CourseDataType, RoadmapCourseDataType } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentSemesterRoadmapAPI } from '../../../../axios/DashboardApi';
import { userDataRecoil } from '../../../../atom/UserAtom';
import { useRecoilValue } from 'recoil';

const Roadmap = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataRecoil);

  // getCurrentSemesterRoadmapAPI는 과목 배열을 직접 반환
  const { data: apiResponse } = useQuery({
    queryKey: ['roadmap'],
    queryFn: () => getCurrentSemesterRoadmapAPI(userData.googleId),
  });

  // 데이터 형식 디버깅
  console.log('API Response:', apiResponse);
  
  // 데이터가 배열인지 확인하고 안전하게 처리
  const roadmapCourses: RoadmapCourseDataType[] = Array.isArray(apiResponse) 
    ? apiResponse 
    : [];

  // 과목들의 학점 총합 계산 (안전하게 처리)
  const totalCredit = roadmapCourses.reduce((acc: number, course: RoadmapCourseDataType) => acc + (course.credit || 0), 0);

  return (
    <S.RoadmapContainer>

      <S.CourseHistoryTop>
        <S.RoadMapTopTitle>
          학기별 로드맵
        </S.RoadMapTopTitle>
        <S.CourseHistoryTopButton onClick={() => {
          navigate('/roadmap');
        }}>
          자세히 보기
        </S.CourseHistoryTopButton>
      </S.CourseHistoryTop>

      <S.RoadmapContent>

        <RoadmapCourse courseData={roadmapCourses} />

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
              {totalCredit}학점
          </S.CourseCreditInformation>

        </S.CourseInformation>

        <S.RoadmapSemester>
          {userData.userSemester}학기 ({userData.yearOfSemester}년 {userData.semesterInYear}학기)
        </S.RoadmapSemester>

      </S.RoadmapContent>
    </S.RoadmapContainer>
  );
};

export default Roadmap;
