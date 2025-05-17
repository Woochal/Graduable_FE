import React, { useState, useEffect } from 'react';
import * as S from '../styled';
import { CourseDataAllType } from '../../../../types/simulator/simulator';
import SearchIcon from '../../../../assets/Search_Large.png';


const CourseList = ({ courseList, handleAddCourse }: { courseList: CourseDataAllType[], handleAddCourse: (course: CourseDataAllType) => void }) => {

  


  return (
    <S.CourseListContainer>
      {courseList.length > 0 ? (
        courseList.map((course) => (
          <S.CourseItem key={course.id}>
            <S.CourseItemTop>
              <S.CourseItemMajor>
                <S.CourseTypeSign major={course.major} />
              </S.CourseItemMajor>
              <S.CourseItemName>{course.name}</S.CourseItemName>
              <S.CourseItemAddButtonDiv>
                <S.CourseItemAddButton onClick={() => handleAddCourse(course)}>추가하기</S.CourseItemAddButton>
              </S.CourseItemAddButtonDiv>
            </S.CourseItemTop>
            <S.CourseItemBottom>
              <S.CourseItemBottomRow>
                <S.CourseItemRoom>시간 : {course.time}</S.CourseItemRoom>
                <S.CourseItemProfessor>강의실 : {course.room}</S.CourseItemProfessor>
              </S.CourseItemBottomRow>
              <S.CourseItemBottomRow>
                <S.CourseItemCredit>학점 : {course.credit}</S.CourseItemCredit>
                <S.CourseItemGradeType>평가방법 : {course.gradeType ? 'Grade' : 'P/F'}</S.CourseItemGradeType>
              </S.CourseItemBottomRow>
              <S.CourseItemBottomRow>
                <S.CourseItemProfessor>교수명 : {course.professor}</S.CourseItemProfessor>
                <S.CourseItemEnglish>영어 여부 : {course.isEnglish ? 'Y' : 'N'}</S.CourseItemEnglish>
              </S.CourseItemBottomRow>             
            </S.CourseItemBottom>
          </S.CourseItem>
        ))
      ) : (
        <S.EmptyCourseList>
          <img src={SearchIcon} alt="search" />
        </S.EmptyCourseList>
      )}
    </S.CourseListContainer>
  );
};

export default CourseList;
