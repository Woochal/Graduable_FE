import React from 'react';
import * as S from '../styled';
import { CourseDataType } from '../../../../types';
import Course from './Course';
const RoadmapCourse = ({courseData} : {courseData: CourseDataType[]}) => {

  const majorData : CourseDataType[] = courseData.filter((course) => course.major);
  const liberalData : CourseDataType[] = courseData.filter((course) => !course.major);

  return (
    <S.RoadmapCourse>
      <S.RoadmapMajor>
        {majorData.map((course, index) => (
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
