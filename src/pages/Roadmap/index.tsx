import { useState } from 'react';
import {
    Container,
    Header,
    Title,
    Legend,
    LegendItem,
    LegendBox,
    LegendText,
    EditButton,
    ContentBox,
    SemesterGrid,
    SemesterCard,
    CourseList,
    CourseItem,
    CourseTypeIndicator,
    CourseName,
    TotalCredits,
    SemesterTitle,
    DeleteButton,
    ModalOverlay,
    ModalContent,
    ModalTitle,
    ModalMessage,
    ModalButtons,
    ModalButton,
} from './components/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllSemesterRoadmapAPI } from '../../axios/DashboardApi';
import { deleteSemesterRoadmapAPI } from '../../axios/RoadmapApi';
import { userDataRecoil } from '../../atom/UserAtom';
import { useRecoilValue } from 'recoil';
import { RoadmapSemesterData, RoadmapCourseDataType } from '../../types';
import { useNavigate } from 'react-router-dom';
import AddCourseModal from './components/AddCourseModal';

// Interface for Course type needed by AddCourseModal
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

// Convert RoadmapCourseDataType to Course
// 로드맵에 가지고 있는 정보는 Course에 비해 적은 정보이기 때문에 모든 정보를 추가해줘야 한다.
const convertToCourseType = (roadmapCourses: RoadmapCourseDataType[]): Course[] => {
    return roadmapCourses.map((course, index) => ({
        id: course.courseID,
        name: course.courseName,
        credit: course.credit,
        major: course.category,
        room: "",
        professor: "",
        gradeType: false,
        isEnglish: false,
        year: 0,
        semester: 0
    }));
};

const Roadmap = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [semesterToEdit, setSemesterToEdit] = useState<number>(-1);
    const [semesterToDelete, setSemesterToDelete] = useState<number | null>(null);
    const userData = useRecoilValue(userDataRecoil);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: roadmapData = [] } = useQuery<RoadmapSemesterData>({
        queryKey: ['roadmap'],
        queryFn: () => getAllSemesterRoadmapAPI(userData.googleId),
    });

    console.log(roadmapData);
    console.log(userData.userSemester);

    const handleAddSemester = () => {
        navigate('/simulator');
    };

    const handleDeleteClick = (index: number) => {
        console.log("delete", index);
        setSemesterToDelete(index);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (semesterToDelete) {
            try {
                // 서버에서 7을 보내면 6학기를 삭제하는 중
                console.log('Deleting semester:', semesterToDelete - 1);
                const response = await deleteSemesterRoadmapAPI(userData.googleId, semesterToDelete - 1);
                console.log('Delete response:', response);
                setDeleteModalOpen(false);
                setSemesterToDelete(null);
                await queryClient.invalidateQueries({ queryKey: ['roadmap'] });
            } catch (error) {
                console.error('학기 삭제 실패:', error);
                alert('학기 삭제에 실패했습니다.');
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setSemesterToDelete(null);
    };

    const handleAddCourse = (semesterNumber: number, index: number) => {
        setSelectedSemester(semesterNumber);
        setSemesterToEdit(index);
        setAddCourseModalOpen(true);
    };

    const handleCloseAddCourseModal = () => {
        setAddCourseModalOpen(false);
        setSelectedSemester(null);
    };

    const totalGridCells = Math.max(8, roadmapData.length + 1);

    return (
        <Container>
            <Header>
                <Title>학기별 로드맵</Title>
                <Legend>
                    <LegendItem>
                        <LegendBox color="rgba(224, 206, 167, 1)" />
                        <LegendText>전공</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendBox color="rgba(167, 180, 224, 1)" />
                        <LegendText>교양</LegendText>
                    </LegendItem>
                </Legend>
                <EditButton onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? '완료' : '수정하기'}</EditButton>
            </Header>
            <ContentBox>
                <SemesterGrid>
                    {Array(totalGridCells)
                        .fill(null)
                        .map((_, index) => {
                            const semesterData = roadmapData[index];
                            console.log(semesterData);
                            if (!semesterData) {
                                return index === roadmapData.length ? (
                                    <div
                                        key="add-button-container"
                                        style={{
                                            width: '212px',
                                            height: '250px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <button
                                            onClick={handleAddSemester}
                                            style={{
                                                width: '99.48px',
                                                height: '99.48px',
                                                backgroundColor: 'rgba(24, 24, 34, 1)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '39.67px',
                                                    height: '2px',
                                                    backgroundColor: 'rgba(108, 108, 114, 1)',
                                                    borderRadius: '2px',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '2px',
                                                    height: '39.67px',
                                                    backgroundColor: 'rgba(108, 108, 114, 1)',
                                                    borderRadius: '2px',
                                                }}
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <div key={`empty-${index}`} />
                                );
                            }

                            // Get the semesterKey (the numeric key in the object)
                            const semesterKey = Object.keys(semesterData)[0];
                            const courses = semesterData[semesterKey];
                            console.log(semesterKey, courses);

                            // 총 학점 계산
                            const totalCredits = Array.isArray(courses) 
                                ? courses.reduce((sum, course) => sum + course.credit, 0)
                                : 0;

                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {isEditMode && <DeleteButton onClick={() => handleDeleteClick(Number(semesterKey))} />}
                                    <SemesterCard
                                        isSelected={Number(semesterKey) === userData.userSemester}
                                        onClick={() => isEditMode && handleAddCourse(Number(semesterKey), index)}
                                        isEditMode={isEditMode}
                                    >
                                        <CourseList>
                                            {Array.isArray(courses) && courses.map((course, courseIndex) => (
                                                <CourseItem
                                                    key={`${semesterKey}-${course.courseName}-${courseIndex}`}
                                                    type={course.category ? '전공' : '교양'}
                                                >
                                                    <CourseTypeIndicator type={course.category ? '전공' : '교양'} />
                                                    <CourseName>
                                                        [{course.credit}] {course.courseName}
                                                    </CourseName>
                                                </CourseItem>
                                            ))}
                                        </CourseList>
                                        <TotalCredits>총 {totalCredits}학점</TotalCredits>
                                    </SemesterCard>
                                    <SemesterTitle>
                                        {Number(semesterKey)}학기
                                    </SemesterTitle>
                                </div>
                            );
                        })}
                </SemesterGrid>
            </ContentBox>
            {deleteModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>로드맵 삭제하기</ModalTitle>
                        <ModalMessage>{semesterToDelete}학기 로드맵을 삭제하시겠습니까?</ModalMessage>
                        <ModalButtons>
                            <ModalButton variant="cancel" onClick={handleDeleteCancel}>
                                취소하기
                            </ModalButton>
                            <ModalButton variant="delete" onClick={handleDeleteConfirm}>
                                삭제하기
                            </ModalButton>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
            {addCourseModalOpen && selectedSemester && (
                <AddCourseModal
                    isOpen={addCourseModalOpen}
                    onClose={handleCloseAddCourseModal}
                    semester={selectedSemester}
                    semesterNumber={selectedSemester}
                    semesterData={semesterToEdit >= 0 && roadmapData[semesterToEdit] ? 
                        convertToCourseType(roadmapData[semesterToEdit][Object.keys(roadmapData[semesterToEdit])[0]]) : 
                    []}
                />
            )}
        </Container>
    );
};

export default Roadmap;