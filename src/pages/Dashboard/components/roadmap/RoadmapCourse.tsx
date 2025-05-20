import React from 'react';
import * as S from '../styled';
import { RoadmapCourseDataType } from '../../../../types';
import Course from './Course';
const RoadmapCourse = ({courseData} : {courseData: RoadmapCourseDataType[]}) => {

  const categoryData : RoadmapCourseDataType[] = courseData.filter((course) => course.category);
  const liberalData : RoadmapCourseDataType[] = courseData.filter((course) => !course.category);

  return (
    <S.RoadmapCourse>
      <S.RoadmapMajor>
        {categoryData.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </S.RoadmapMajor>
      <S.RoadmapLiberal>
        {liberalData.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </S.RoadmapLiberal>
    </S.RoadmapCourse>
  );
};

export default RoadmapCourse;
