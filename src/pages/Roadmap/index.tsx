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

const Roadmap = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
    const [semesterToDelete, setSemesterToDelete] = useState<string | null>(null);
    const userData = useRecoilValue(userDataRecoil);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: roadmapData = [] } = useQuery<RoadmapSemesterData>({
        queryKey: ['roadmap'],
        queryFn: () => getAllSemesterRoadmapAPI(userData.googleId),
    });

    // 학기 데이터를 정렬하여 표시하기 위한 처리
    const sortedSemesters = roadmapData
        .map((semesterObj) => {
            const semesterKey = Object.keys(semesterObj)[0];
            return {
                key: semesterKey,
                courses: semesterObj[semesterKey],
            };
        })
        .sort((a, b) => {
            // "2024-1" 형식의 문자열을 비교하여 정렬
            const [yearA, semA] = a.key.split('-').map(Number);
            const [yearB, semB] = b.key.split('-').map(Number);

            if (yearA !== yearB) return yearA - yearB;
            return semA - semB;
        });

    // 학기 수 계산
    const calculateSemester = (semesterKey: string) => {
        const [year, sem] = semesterKey.split('-').map(Number);
        const firstYear = sortedSemesters[0]?.key.split('-')[0];
        const firstSem = sortedSemesters[0]?.key.split('-')[1];

        if (!firstYear || !firstSem) return 1;

        const yearDiff = Number(year) - Number(firstYear);
        const semDiff = Number(sem) - Number(firstSem);

        return yearDiff * 2 + semDiff + 1;
    };

    const handleAddSemester = () => {
        navigate('/simulator');
    };

    const handleDeleteClick = (semesterKey: string) => {
        setSemesterToDelete(semesterKey);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (semesterToDelete) {
            try {
                const semester = calculateSemester(semesterToDelete);
                console.log('Deleting semester:', semester, 'for semesterKey:', semesterToDelete);
                const response = await deleteSemesterRoadmapAPI(userData.googleId, semester);
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

    const handleAddCourse = (semesterKey: string) => {
        setSelectedSemester(semesterKey);
        setAddCourseModalOpen(true);
    };

    const handleCloseAddCourseModal = () => {
        setAddCourseModalOpen(false);
        setSelectedSemester(null);
    };

    const totalGridCells = Math.max(8, sortedSemesters.length + 1);

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
                            const semesterData = sortedSemesters[index];

                            if (!semesterData) {
                                return index === sortedSemesters.length ? (
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

                            const { key: semesterKey, courses } = semesterData;

                            // 총 학점 계산
                            const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0);

                            return (
                                <div
                                    key={semesterKey}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {isEditMode && <DeleteButton onClick={() => handleDeleteClick(semesterKey)} />}
                                    <SemesterCard
                                        isSelected={calculateSemester(semesterKey) === userData.userSemester}
                                        onClick={() => isEditMode && handleAddCourse(semesterKey)}
                                        isEditMode={isEditMode}
                                    >
                                        <CourseList>
                                            {courses.map((course, courseIndex) => (
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
                                        {calculateSemester(semesterKey)}학기({semesterKey.substring(2)})
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
                        <ModalMessage>{semesterToDelete} 로드맵을 삭제하시겠습니까?</ModalMessage>
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
                    semesterNumber={calculateSemester(selectedSemester)}
                />
            )}
        </Container>
    );
};

export default Roadmap;
