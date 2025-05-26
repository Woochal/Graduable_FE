import React from 'react';
import * as S from '../styled';
import { RoadmapCourseDataType } from '../../../../types';
import Course from './Course';
const RoadmapCourse = ({courseData} : {courseData: RoadmapCourseDataType[]}) => {

  const categoryData : RoadmapCourseDataType[] = courseData.filter((course) => course.category);
  const liberalData : RoadmapCourseDataType[] = courseData.filter((course) => !course.category);

  return (
    <S.RoadmapCourse>
      <S.RoadmapCourseGrid>
        {courseData.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </S.RoadmapCourseGrid>
    </S.RoadmapCourse>
  );
};

export default RoadmapCourse;
