import React from 'react';
import * as S from '../styled';
import { CourseDataType } from '../../../../types';

const Course = (courseData : CourseDataType) => {

  const { name, credit, major, professor, classroom } = courseData;

  return (
    <S.Course>
      <S.CourseType>
        <S.CourseTypeSign major={major} />
      </S.CourseType>
      <S.CourseTitle>
        [{credit}] {name}
      </S.CourseTitle>
    </S.Course>
  );
};

export default Course;
