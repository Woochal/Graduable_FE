import React, { useState } from 'react';
import {
    AddCourseModalOverlay,
    AddCourseModalContent,
    AddCourseModalTitle,
    AddCourseModalSemesterTitle,
    AddCourseSearchContainer,
    AddCourseSearchInput,
    SearchResultContainer,
    SearchResultItem,
    CourseTypeDot,
    CourseInfo,
    CourseName,
    CourseSection,
    AddCourseButton,
    SelectedCourseTag,
    TagCourseTypeDot,
    TagCourseName,
    RemoveTagButton,
    AddCourseButtonContainer,
    AddCourseCancelButton,
    AddCourseSaveButton,
    EmptyResultWrapper,
    MagnifierCircle,
    AddCourseTagContainer,
} from './styled';
import { useQuery } from '@tanstack/react-query';
import { getSearchCourseAPI } from '../../../axios/SimulatorApi';
import { CourseDataAllType } from '../../../types/simulator/simulator';

interface Course {
    id: number;
    name: string;
    credit: number;
    major: boolean;
    room: string;
    professor: string;
    gradeType: boolean;
    isEnglish: boolean;
    year: number;
    semester: number;
}

interface AddCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    semester: string;
    semesterNumber: number;
}

const MagnifierIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="9" stroke="#6C6C72" strokeWidth="2" />
        <rect x="22.071" y="22.071" width="2" height="7" rx="1" transform="rotate(-45 22.071 22.071)" fill="#6C6C72" />
    </svg>
);

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, semester, semesterNumber }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

    // API 호출로 검색 결과 받아오기
    const { data: searchResults = [] } = useQuery<CourseDataAllType[]>({
        queryKey: ['courseList', searchTerm],
        queryFn: () => getSearchCourseAPI(searchTerm),
        enabled: searchTerm.length > 0,
    });

    const handleAddCourse = (course: CourseDataAllType) => {
        if (!selectedCourses.find((c) => c.id === course.id)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleRemoveCourse = (courseId: number) => {
        setSelectedCourses(selectedCourses.filter((course) => course.id !== courseId));
    };

    if (!isOpen) return null;

    return (
        <AddCourseModalOverlay>
            <AddCourseModalContent>
                <AddCourseModalSemesterTitle>
                    {semesterNumber}학기 ({semester})
                </AddCourseModalSemesterTitle>
                <AddCourseModalTitle>추가하고 싶은 과목을 입력해주세요.</AddCourseModalTitle>

                <AddCourseSearchContainer>
                    <AddCourseSearchInput
                        placeholder="ex) 컴퓨터 구조"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </AddCourseSearchContainer>

                <AddCourseTagContainer>
                    {selectedCourses.map((course) => (
                        <SelectedCourseTag key={course.id}>
                            <TagCourseTypeDot type={course.major ? '전공' : '교양'} />
                            <TagCourseName>
                                [{course.credit}] {course.name}
                            </TagCourseName>
                            <RemoveTagButton onClick={() => handleRemoveCourse(course.id)}>×</RemoveTagButton>
                        </SelectedCourseTag>
                    ))}
                </AddCourseTagContainer>

                <SearchResultContainer>
                    {searchTerm && searchResults.length === 0 ? (
                        <EmptyResultWrapper>
                            <MagnifierCircle>
                                <MagnifierIcon />
                            </MagnifierCircle>
                        </EmptyResultWrapper>
                    ) : (
                        searchResults.map((course) => (
                            <SearchResultItem key={course.id}>
                                <CourseTypeDot type={course.major ? '전공' : '교양'} />
                                <CourseInfo>
                                    <CourseName>
                                        [{course.credit}] {course.name}
                                    </CourseName>
                                </CourseInfo>
                                <AddCourseButton onClick={() => handleAddCourse(course)}>추가</AddCourseButton>
                            </SearchResultItem>
                        ))
                    )}
                </SearchResultContainer>

                <AddCourseButtonContainer>
                    <AddCourseCancelButton onClick={onClose}>취소하기</AddCourseCancelButton>
                    <AddCourseSaveButton>저장하기</AddCourseSaveButton>
                </AddCourseButtonContainer>
            </AddCourseModalContent>
        </AddCourseModalOverlay>
    );
};

export default AddCourseModal;
