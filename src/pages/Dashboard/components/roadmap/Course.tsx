import React from 'react';
import * as S from '../styled';
import { RoadmapCourseDataType } from '../../../../types';

const Course = (courseData : RoadmapCourseDataType) => {

  const { courseName, credit, category, semester } = courseData;

  return (
    <S.Course>
      <S.CourseType>
        <S.CourseTypeSign major={category} />
      </S.CourseType>
      <S.CourseTitle>
        [{credit}] {courseName}
      </S.CourseTitle>
    </S.Course>
  );
};

export default Course;
