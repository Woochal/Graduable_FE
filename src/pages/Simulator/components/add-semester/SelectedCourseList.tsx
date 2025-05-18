import React, { useState } from 'react';
import * as S from '../styled';
import { useNavigate } from 'react-router-dom';
import { CourseDataAllType } from '../../../../types/simulator/simulator';
import deleteIcon from '../../../../assets/delete.png';
import Modal from './Modal';

const SelectedCourseList = ({ selectedCourseList, handleDeleteCourse }: { selectedCourseList: CourseDataAllType[], handleDeleteCourse: (course: CourseDataAllType) => void }) => {

  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const handleSemesterUpdate = (semester: number) => {
    // TODO: 로드맵에 추가
  };

  return (
    <S.SelectedCourseListContainer>
      {/* 학기 수정 모달 */}
			<Modal
				isOpen={showSemesterModal}
				onClose={() => setShowSemesterModal(false)}
				onSave={handleSemesterUpdate}
			/>
      {selectedCourseList?.length > 0 ? (
        <S.SelectedCourseList>
          <S.SelectedCourseListGrid>
          {selectedCourseList.map((course) => (
              <S.SelectedCourseItem key={course.id}>
                <S.SelectedCourseMajor>
                  <S.CourseTypeSign major={course.major} />
                </S.SelectedCourseMajor>
                <S.SelectedCourseItemCredit> [{course.credit}] </S.SelectedCourseItemCredit>
                <S.SelectedCourseItemName>{course.name}</S.SelectedCourseItemName>
                <S.SelectedCourseItemDeletedDiv>
                  <S.SelectedCourseItemDeletedButton onClick={() => handleDeleteCourse(course)}>
                    <S.SelectedCourseItemDeletedButtonImg src={deleteIcon} alt="delete"/>
                  </S.SelectedCourseItemDeletedButton>
                </S.SelectedCourseItemDeletedDiv>
              </S.SelectedCourseItem>
          ))}
          </S.SelectedCourseListGrid>
          <S.SelectedCourseListSaveButtonDiv onClick={() => setShowSemesterModal(true)}>
            <S.SelectedCourseListSaveButton>
              저장하기
            </S.SelectedCourseListSaveButton>
          </S.SelectedCourseListSaveButtonDiv>
        </S.SelectedCourseList>
      ) : (
        <S.SelectedCourseListEmpty>
          왼쪽에서 과목을 검색한 후 추가해주세요.
        </S.SelectedCourseListEmpty>
      )}
    </S.SelectedCourseListContainer>
  );
};

export default SelectedCourseList;
